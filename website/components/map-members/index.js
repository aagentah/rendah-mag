import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import debounce from 'lodash/debounce';
import BlockContent from '@sanity/block-content-to-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { getDominionUsersAllTime } from '~/lib/sanity/requests';
import { countryCodeMap } from '~/lib/countryCodeMap';

import Table from '~/components/table';

import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

import { useApp } from '~/context-provider/app';

const countryNameToCodeMap = {};
Object.entries(countryCodeMap).forEach(([code, data]) => {
  if (Array.isArray(data.name)) {
    data.name.forEach((name) => {
      countryNameToCodeMap[name.toLowerCase()] = code;
    });
  } else {
    countryNameToCodeMap[data.name.toLowerCase()] = code;
  }
});

const BUBBLE_STYLES = {
  context: { fill: 'rgba(255, 0, 0, 0.9)', stroke: 'rgba(255, 0, 0, 1)' },
  default: {
    fill: 'rgb(170, 170, 170, 0.25)',
    stroke: 'rgb(170, 170, 170, 5)',
  },
};

const lookupCaseInsensitive = (obj, key) => {
  return obj[key] || obj[key.toUpperCase()] || obj[key.toLowerCase()];
};

const findCountryCode = (identifier) => {
  if (countryCodeMap[identifier]) return identifier;
  const codeFromName = countryNameToCodeMap[identifier.toLowerCase()];
  if (codeFromName) return codeFromName;
  return Object.keys(countryCodeMap).find((code) =>
    Array.isArray(countryCodeMap[code].name)
      ? countryCodeMap[code].name.some(
          (name) => name.toLowerCase() === identifier.toLowerCase()
        )
      : false
  );
};

const StatsTable = memo(
  ({
    selectedCountry,
    selectedCity,
    citiesCount,
    membersCount,
    quoteMembersCount,
  }) =>
    selectedCountry && !selectedCity ? (
      <>
        <h2 className="mb-2">{selectedCountry}</h2>
        <Table
          className="text-neutral-300"
          rows={[
            { left: 'Member Cities', right: citiesCount },
            { left: 'Members Count', right: membersCount },
            { left: 'Member Quotes', right: quoteMembersCount },
          ]}
        />
      </>
    ) : null
);

const WorldMapWithUsers = () => {
  const mapRef = useRef(null);
  const cityCoordsRef = useRef({});
  const [users, setUsers] = useState([]);
  const [mapData, setMapData] = useState(null);
  const [cityData, setCityData] = useState({});
  const [cityCoords, setCityCoords] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isCityCoordsFetched, setIsCityCoordsFetched] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showFade, setShowFade] = useState(false);
  const quoteBoxRef = useRef(null);
  const app = useApp();
  const [cityCoordsCache, setCityCoordsCache] = useState(null); // cache from city-coords.json
  const [visibleCityCount, setVisibleCityCount] = useState(0); // why: controls how many city bubbles are visible for animated reveal

  // Tooltip state for React tooltip
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  // Add refs for <g> groups to enable D3 transitions for zoom/fade
  const countriesGroupRef = useRef(null); // why: needed for D3 zoom transitions
  const bubblesGroupRef = useRef(null); // why: needed for D3 zoom transitions
  const currentTransform = useRef('translate(0,0) scale(1)'); // why: preserve transform state for transitions

  const projectionMemo = useMemo(() => {
    if (!mapData || dimensions.width === 0) return null;
    return d3
      .geoEquirectangular()
      .fitSize(
        [dimensions.width, dimensions.height],
        topojson.feature(mapData, mapData.objects.countries)
      );
  }, [mapData, dimensions]);

  const pathMemo = useMemo(() => {
    if (!projectionMemo) return null;
    return d3.geoPath().projection(projectionMemo);
  }, [projectionMemo]);

  const filteredCountriesMemo = useMemo(() => {
    if (!pathMemo || !mapData) return [];
    const countries = topojson.feature(
      mapData,
      mapData.objects.countries
    ).features;
    return countries.filter((country) => {
      const centroid = d3.geoCentroid(country);
      return centroid[1] < 80 && centroid[1] > -80;
    });
  }, [pathMemo, mapData]);

  const normalizedUsers = useMemo(() => {
    return users.map((u) => {
      let code = u.country;
      if (code && code.length > 2) {
        const mapped = countryNameToCodeMap[code.toLowerCase()];
        if (mapped) code = mapped;
      }
      return { ...u, countryCode: code ? code.toUpperCase() : null };
    });
  }, [users]);

  const countryUsers = useMemo(() => {
    if (!selectedCountryId) return [];
    return normalizedUsers.filter((user) => {
      const info = countryCodeMap[user.countryCode];
      return info ? info.id === selectedCountryId : false;
    });
  }, [normalizedUsers, selectedCountryId]);

  const citiesCount = useMemo(
    () =>
      new Set(
        countryUsers
          .map((u) => u.city && u.city.toLowerCase().trim())
          .filter(Boolean)
      ).size,
    [countryUsers]
  );
  const membersCount = countryUsers.length;
  const quoteMembersCount = countryUsers.filter((u) => u.quote).length;

  useEffect(() => {
    setFadeIn(!!selectedCity);
  }, [selectedCity]);

  const getCityCoords = useCallback(
    (city, country) => {
      if (!city || !country) return null;
      const key = `${city.toLowerCase().trim()}|${country
        .toUpperCase()
        .trim()}`;
      if (cityCoords[key]) return cityCoords[key];
      // fallback: try city only (legacy)
      const legacyKey = city.toLowerCase().trim();
      if (cityCoords[legacyKey]) return cityCoords[legacyKey];
      return null;
    },
    [cityCoords]
  );

  const getCityPointInCountry = useCallback(
    (city, country) => {
      const projection = projectionMemo;
      if (!projection) return null;
      const coords = getCityCoords(city, country);
      if (coords) {
        return projection(coords);
      }
      // fallback: try old cityData logic
      const lowerKey = city && city.toLowerCase();
      let countryObj = lookupCaseInsensitive(cityData, city);
      if (!countryObj) {
        const code = countryNameToCodeMap[lowerKey];
        if (code) {
          countryObj = lookupCaseInsensitive(cityData, code);
        }
        if (!countryObj) {
          const matchingCode = findCountryCode(city);
          if (matchingCode) {
            countryObj = lookupCaseInsensitive(cityData, matchingCode);
          }
        }
      }
      if (
        !countryObj ||
        !countryObj.coordinates ||
        !countryObj.coordinates.length
      ) {
        return null;
      }
      return projection([countryObj.coordinates[1], countryObj.coordinates[0]]);
    },
    [cityCoords, cityData, projectionMemo, getCityCoords]
  );

  const applyInteractivity = useCallback(
    (bubble, cityInfo, scaleValue) => {
      bubble
        .style(
          'pointer-events',
          selectedCountry && cityInfo.context ? 'auto' : 'none'
        )
        .style(
          'cursor',
          selectedCountry && cityInfo.context ? 'pointer' : 'default'
        )
        .on('mouseover', null)
        .on('mouseout', null)
        .on('click', null);
      if (selectedCountry) {
        bubble
          .on('mouseover', function () {
            d3.select(this).attr(
              'fill',
              BUBBLE_STYLES[cityInfo.context ? 'context' : 'default'].fill
            );
            const tooltip = d3.select(mapRef.current).select('.tooltip');
            const circleRect = this.getBoundingClientRect();
            const containerRect = mapRef.current.getBoundingClientRect();
            const tooltipWidth = tooltip.node().offsetWidth;
            const tooltipHeight = tooltip.node().offsetHeight;
            const tooltipX =
              circleRect.left -
              containerRect.left +
              circleRect.width / 2 -
              tooltipWidth / 2;
            const tooltipY =
              circleRect.top - containerRect.top - tooltipHeight - 5;
            tooltip
              .style('visibility', 'visible')
              .html(`${cityInfo.city}: ${cityInfo.count} members`)
              .style('top', tooltipY + 'px')
              .style('left', tooltipX + 'px');
          })
          .on('mouseout', function () {
            d3.select(this).attr(
              'fill',
              BUBBLE_STYLES[cityInfo.context ? 'context' : 'default'].fill
            );
            d3.select(mapRef.current)
              .select('.tooltip')
              .style('visibility', 'hidden');
          });
        if (cityInfo.context) {
          bubble.on('click', function () {
            setSelectedCity(cityInfo);
            setCurrentUserIndex(0);
            const point = getCityPointInCountry(
              cityInfo.city,
              cityInfo.country
            );
            if (point) {
              const scale = scaleValue;
              const translate = [
                dimensions.width / 2 - scale * point[0],
                dimensions.height / 2 - scale * point[1],
              ];
              const transformString = `translate(${translate}) scale(${scale})`;
              d3.select(countriesGroupRef.current)
                .transition()
                .duration(750)
                .attr('transform', transformString);
              d3.select(bubblesGroupRef.current)
                .transition()
                .duration(750)
                .attr('transform', transformString);
            }
          });
        }
      }
    },
    [selectedCountry, dimensions, getCityPointInCountry]
  );

  const zoomToCountryById = useCallback(
    (countryId) => {
      // Helper to zoom to a country by its id (used for both country click and city->country back)
      if (!pathMemo || !dimensions.width || !dimensions.height) return;
      const countryFeature = filteredCountriesMemo.find(
        (c) => c.id === countryId
      );
      if (!countryFeature) return;
      const [[cx0, cy0], [cx1, cy1]] = pathMemo.bounds(countryFeature);
      const dx = cx1 - cx0;
      const dy = cy1 - cy0;
      const x = (cx0 + cx1) / 2;
      const y = (cy0 + cy1) / 2;
      const scale = Math.max(
        1,
        Math.min(
          12,
          0.9 / Math.max(dx / dimensions.width, dy / dimensions.height)
        )
      );
      const translate = [
        dimensions.width / 2 - scale * x,
        dimensions.height / 2 - scale * y,
      ];
      const transformString = `translate(${translate}) scale(${scale})`;
      d3.select(countriesGroupRef.current)
        .transition()
        .duration(750)
        .attr('transform', transformString);
      d3.select(bubblesGroupRef.current)
        .transition()
        .duration(750)
        .attr('transform', transformString);
    },
    [pathMemo, filteredCountriesMemo, dimensions]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const worldData = await d3.json('/map/world-110m.json');
        setMapData(worldData);
        const userData = await getDominionUsersAllTime();
        setUsers(userData);
        const cities = await fetchCityData();
        setCityData(cities);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchCityData = async () => {
    try {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,capitalInfo,latlng'
      );
      const countries = await response.json();
      const cityLookup = {};
      countries.forEach((country) => {
        if (country.cca2) {
          cityLookup[country.cca2] = {
            capital: country.capital?.[0] || null,
            coordinates: country.capitalInfo?.latlng || country.latlng,
            name: country.name.common,
          };
        }
        if (country.cca3) {
          cityLookup[country.cca3] = {
            capital: country.capital?.[0] || null,
            coordinates: country.capitalInfo?.latlng || country.latlng,
            name: country.name.common,
          };
        }
        cityLookup[country.name.common.toLowerCase()] = {
          capital: country.capital?.[0] || null,
          coordinates: country.capitalInfo?.latlng || country.latlng,
          name: country.name.common,
        };
      });
      return cityLookup;
    } catch (error) {
      console.error('Error fetching city data:', error);
      return {};
    }
  };

  useEffect(() => {
    setIsLoading(
      !(
        mapData &&
        users.length > 0 &&
        Object.keys(cityData).length > 0 &&
        isCityCoordsFetched
      )
    );
  }, [mapData, users, cityData, isCityCoordsFetched]);

  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        setDimensions({
          width: mapRef.current.clientWidth,
          height: mapRef.current.clientWidth / 2,
        });
      }
    };
    const debounced = debounce(updateDimensions, 200);
    debounced();
    window.addEventListener('resize', debounced);
    return () => {
      window.removeEventListener('resize', debounced);
    };
  }, []);

  useEffect(() => {
    // Load city-coords.json cache on mount for fast city coordinate lookup
    fetch('/map/city-coords.json')
      .then((res) => res.json())
      .then((data) => setCityCoordsCache(data))
      .catch((err) => {
        console.error('Failed to load city-coords.json', err);
        setCityCoordsCache({});
      });
  }, []);

  useEffect(() => {
    if (users.length === 0 || !cityCoordsCache) return;
    // why: Use city+country as key to disambiguate cities with same name in different countries
    const uniqueCityCountryPairs = Array.from(
      new Set(
        users
          .filter((u) => u.city && u.country)
          .map(
            (u) =>
              `${u.city.toLowerCase().trim()}|${u.country.toUpperCase().trim()}`
          )
      )
    );
    // Use cache for all city-country pairs we can
    uniqueCityCountryPairs.forEach((cityCountryKey) => {
      if (cityCoordsCache[cityCountryKey]) {
        cityCoordsRef.current[cityCountryKey] = cityCoordsCache[cityCountryKey];
      }
    });
    // Only fetch coords for city-country pairs not in cache
    const pairsToFetch = uniqueCityCountryPairs.filter(
      (key) => !(key in cityCoordsRef.current)
    );
    if (pairsToFetch.length === 0) {
      setCityCoords({ ...cityCoordsRef.current });
      setIsCityCoordsFetched(true);
      return;
    }
    // Fallback: fetch missing city-country pairs from API, log for future cache update
    Promise.all(
      pairsToFetch.map(async (cityCountryKey) => {
        const [city, country] = cityCountryKey.split('|');
        try {
          const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city
          )}&count=5&language=en&format=json`;
          const response = await fetch(url);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            // Try to find the result matching the country code
            const match = data.results.find(
              (r) => r.country_code && r.country_code.toUpperCase() === country
            );
            const result = match || data.results[0];
            // why: Log for future cache update with city+country key
            console.warn(
              'City-country missing from cache, add to city-coords.json:',
              cityCountryKey,
              [result.longitude, result.latitude]
            );
            return {
              cityCountryKey,
              coords: [result.longitude, result.latitude],
            };
          }
        } catch {
          return { cityCountryKey, coords: null };
        }
        return { cityCountryKey, coords: null };
      })
    ).then((results) => {
      results.forEach(({ cityCountryKey, coords }) => {
        if (coords) {
          cityCoordsRef.current[cityCountryKey] = coords;
        }
      });
      setCityCoords({ ...cityCoordsRef.current });
      setIsCityCoordsFetched(true);
    });
  }, [users, cityCoordsCache]);

  // Calculate memberCountryIds for fill/click logic
  const memberCountryIds = useMemo(() => {
    const ids = new Set();
    normalizedUsers.forEach((u) => {
      if (u.countryCode && countryCodeMap[u.countryCode]) {
        ids.add(countryCodeMap[u.countryCode].id);
      }
    });
    return ids;
  }, [normalizedUsers]);

  // Helper for country click
  const handleCountryClick = useCallback(
    (d) => {
      if (!memberCountryIds.has(d.id)) return;
      let countryName = 'Selected Country';
      for (const [code, data] of Object.entries(countryCodeMap)) {
        if (data.id === d.id) {
          countryName = Array.isArray(data.name) ? data.name[0] : data.name;
          break;
        }
      }
      // Zoom logic: for now, just set selected
      setSelectedCountryId(d.id);
      setSelectedCountry(countryName);
      setSelectedCity(null);
    },
    [memberCountryIds]
  );

  // Helper for city bubble click
  const handleCityClick = useCallback((cityInfo) => {
    setSelectedCity(cityInfo);
    setCurrentUserIndex(0);
    // Zoom logic can be added here if needed
  }, []);

  // Mouse events for tooltip
  const handleBubbleMouseOver = (event, cityInfo) => {
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      content: `${cityInfo.city}: ${cityInfo.count} members`,
    });
  };
  const handleBubbleMouseOut = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: '' });
  };

  const globalCityGroupsMemo = useMemo(() => {
    const byCity = {};
    normalizedUsers.forEach((u) => {
      if (!u.city || !u.countryCode) return;
      const key = u.city.toLowerCase().trim();
      if (!byCity[key]) {
        byCity[key] = {
          city: u.city,
          country: u.countryCode,
          count: 0,
          context: false,
          users: [],
        };
      }
      byCity[key].count++;
      if (u.quote) byCity[key].context = true;
      byCity[key].users.push(u);
    });
    // Only include cities with valid coordinates
    return Object.values(byCity).filter((ci) =>
      getCityPointInCountry(ci.city, ci.country)
    );
  }, [normalizedUsers, getCityPointInCountry]);

  const filteredUsers = useMemo(
    () =>
      selectedCity && selectedCity.users
        ? selectedCity.users.filter((u) => u.quote)
        : [],
    [selectedCity]
  );

  const currentUser = filteredUsers[currentUserIndex] || null;

  useEffect(() => {
    const el = quoteBoxRef.current;
    if (!el) return;
    const checkFade = () => {
      setShowFade(
        el.scrollHeight > el.clientHeight &&
          el.scrollTop + el.clientHeight < el.scrollHeight - 2
      );
    };
    checkFade();
    el.addEventListener('scroll', checkFade);
    window.addEventListener('resize', checkFade);
    return () => {
      el.removeEventListener('scroll', checkFade);
      window.removeEventListener('resize', checkFade);
    };
  }, [currentUser, dimensions.height]);

  // D3 transition for zoom/fade on country/city selection
  useEffect(() => {
    if (
      !pathMemo ||
      !filteredCountriesMemo.length ||
      !dimensions.width ||
      !dimensions.height
    )
      return;
    // Helper to get transform for a country or reset
    const getTransform = (countryId, cityPoint, scaleOverride) => {
      if (cityPoint) {
        // Zoom to city
        const scale = scaleOverride || 6;
        const translate = [
          dimensions.width / 2 - scale * cityPoint[0],
          dimensions.height / 2 - scale * cityPoint[1],
        ];
        return `translate(${translate}) scale(${scale})`;
      }
      if (countryId) {
        const countryFeature = filteredCountriesMemo.find(
          (c) => c.id === countryId
        );
        if (!countryFeature) return 'translate(0,0) scale(1)';
        const [[cx0, cy0], [cx1, cy1]] = pathMemo.bounds(countryFeature);
        const dx = cx1 - cx0;
        const dy = cy1 - cy0;
        const x = (cx0 + cx1) / 2;
        const y = (cy0 + cy1) / 2;
        const scale = Math.max(
          1,
          Math.min(
            12,
            0.9 / Math.max(dx / dimensions.width, dy / dimensions.height)
          )
        );
        const translate = [
          dimensions.width / 2 - scale * x,
          dimensions.height / 2 - scale * y,
        ];
        return `translate(${translate}) scale(${scale})`;
      }
      return 'translate(0,0) scale(1)';
    };
    let targetTransform = 'translate(0,0) scale(1)';
    if (
      selectedCity &&
      getCityPointInCountry(selectedCity.city, selectedCity.country)
    ) {
      targetTransform = getTransform(
        null,
        getCityPointInCountry(selectedCity.city, selectedCity.country),
        6
      );
    } else if (selectedCountryId) {
      targetTransform = getTransform(selectedCountryId);
    }
    // Only animate if transform changes
    if (currentTransform.current !== targetTransform) {
      if (countriesGroupRef.current && bubblesGroupRef.current) {
        d3.select(countriesGroupRef.current)
          .transition()
          .duration(750)
          .attr('transform', targetTransform);
        d3.select(bubblesGroupRef.current)
          .transition()
          .duration(750)
          .attr('transform', targetTransform);
      }
      currentTransform.current = targetTransform;
    }
  }, [
    selectedCountryId,
    selectedCity,
    pathMemo,
    filteredCountriesMemo,
    dimensions,
    getCityPointInCountry,
  ]);

  // Animated reveal of city bubbles (why: visually engaging, zero regression to interactivity)
  useEffect(() => {
    // Only animate on initial load or when city set changes
    if (!globalCityGroupsMemo.length) {
      setVisibleCityCount(0);
      return;
    }
    setVisibleCityCount(0); // reset on new data
    let batch = 5; // how many bubbles per tick
    let interval = 10; // ms per tick
    let cancelled = false;
    function step() {
      setVisibleCityCount((prev) => {
        if (prev >= globalCityGroupsMemo.length) return prev;
        return Math.min(prev + batch, globalCityGroupsMemo.length);
      });
    }
    // Animate until all visible
    let timer = setInterval(() => {
      setVisibleCityCount((prev) => {
        if (prev >= globalCityGroupsMemo.length) {
          clearInterval(timer);
          return prev;
        }
        return Math.min(prev + batch, globalCityGroupsMemo.length);
      });
    }, interval);
    return () => {
      clearInterval(timer);
      cancelled = true;
    };
  }, [globalCityGroupsMemo.length]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-x-12">
        <div className="flex flex-col gap-y-4 w-full md:w-4/12 md:border-r border-neutral-700 pr-12 order-2 md:order-1">
          {!selectedCountry && (
            <div className="flex flex-col gap-y-4">
              <h1 className="text-neutral-300">Member Map</h1>
              <p className="text-neutral-400 text-sm mb-4">
                Explore creative context in each city; as presented from the
                Rendah Mag members
              </p>
              <div className="map-key flex flex-col gap-1.5 min-w-[120px] border border-neutral-800 text-[11.5px] text-neutral-200 mt-0.5 mb-0.5 w-fit self-start">
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full mr-1.5"
                    style={{
                      background: 'rgba(255,0,0,0.9)',
                      border: '1.5px solid rgba(255,0,0,1)',
                    }}
                  />
                  <span className="text-neutral-300">
                    Active member{' '}
                    <span className="text-[#ff4d4d] font-medium">
                      provided context
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full mr-1.5"
                    style={{
                      background: 'rgba(170,170,170,0.25)',
                      border: '1.5px solid rgba(170,170,170,0.5)',
                    }}
                  />
                  <span className="text-neutral-200">
                    Active member{' '}
                    <span className="text-neutral-300 font-medium">
                      no context yet
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
          {(selectedCountry || selectedCity) && (
            <button
              onClick={() => {
                if (selectedCity) {
                  // If a city is selected, go back to the country view only (preserve selectedCountry/selectedCountryId)
                  if (selectedCountryId) {
                    zoomToCountryById(selectedCountryId); // Zoom to country on city->country back
                  }
                  setSelectedCity(null);
                  setCurrentUserIndex(0);
                } else {
                  d3.select(countriesGroupRef.current)
                    .transition()
                    .duration(750)
                    .attr('transform', 'translate(0,0) scale(1)');
                  d3.select(bubblesGroupRef.current)
                    .transition()
                    .duration(750)
                    .attr('transform', 'translate(0,0) scale(1)');
                  setSelectedCountry(null);
                  setSelectedCity(null);
                  setSelectedCountryId(null);
                  setCurrentUserIndex(0);
                }
              }}
              className={`text-sm text-rendah-red underline flex items-center gap-x-2 mb-4  ${
                selectedCountry || selectedCity ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="rendah-red"
                style={{ fontSize: '16px' }}
              />
              Back
            </button>
          )}
          <StatsTable
            selectedCountry={selectedCountry}
            selectedCity={selectedCity}
            citiesCount={citiesCount}
            membersCount={membersCount}
            quoteMembersCount={quoteMembersCount}
          />
          <div className="block">
            {selectedCity && (
              <div className={` ${fadeIn ? 'opacity-90' : 'opacity-0'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-neutral-200 text-lg">
                    {selectedCity.city}{' '}
                    {filteredUsers.length > 0
                      ? `${currentUserIndex + 1}/${filteredUsers.length}`
                      : ''}
                  </h2>
                  {filteredUsers.length > 1 && (
                    <div className="flex gap-x-4">
                      <button
                        onClick={() =>
                          setCurrentUserIndex((p) =>
                            p > 0 ? p - 1 : filteredUsers.length - 1
                          )
                        }
                        className="text-xs text-neutral-300 cursor-pointer underline"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() =>
                          setCurrentUserIndex((p) =>
                            p < filteredUsers.length - 1 ? p + 1 : 0
                          )
                        }
                        className="text-xs text-neutral-300 cursor-pointer underline"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
                {currentUser && (
                  <div className="flex flex-col gap-y-2 text-sm mb-4">
                    <h3 className="text-neutral-300 mb-2">
                      {currentUser.name && currentUser.name}:{' '}
                    </h3>
                    <div style={{ position: 'relative' }}>
                      <div
                        className="rich-text-spacing text-xs text-neutral-400"
                        style={{
                          maxHeight:
                            app.deviceSize !== 'md'
                              ? `${dimensions.height - 120}px`
                              : undefined,
                          overflowY:
                            app.deviceSize !== 'md' ? 'auto' : 'hidden',
                        }}
                        ref={quoteBoxRef}
                      >
                        <BlockContent
                          blocks={currentUser.quote}
                          serializers={SANITY_BLOCK_SERIALIZERS}
                        />
                      </div>
                      {showFade && (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '56px',
                            pointerEvents: 'none',
                            background:
                              'linear-gradient(to bottom, rgba(33,33,33,0) 0%, rgba(33,33,33,0.98) 100%)',
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-8/12 order-1 md:order-2 pb-6 md:pb-0">
          <div
            className="overflow-hidden"
            style={{ display: 'flex', position: 'relative' }}
          >
            <svg
              ref={mapRef}
              width={dimensions.width}
              height={dimensions.height}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              viewBox={
                projectionMemo && mapData && pathMemo
                  ? (() => {
                      const featureCollection = {
                        type: 'FeatureCollection',
                        features: filteredCountriesMemo,
                      };
                      const [[x0, y0], [x1, y1]] =
                        pathMemo.bounds(featureCollection);
                      return `${x0} ${y0} ${x1 - x0} ${y1 - y0}`;
                    })()
                  : undefined
              }
            >
              {/* Countries group for D3 zoom/fade transitions */}
              <g
                ref={countriesGroupRef} /* why: D3 transitions for zoom/fade */
              >
                {filteredCountriesMemo.map((country) => (
                  <path
                    key={country.id}
                    className="country transition-opacity duration-700"
                    d={pathMemo(country)}
                    fill={
                      memberCountryIds.has(country.id) ? '#525252' : '#404040'
                    }
                    opacity={
                      selectedCity
                        ? (() => {
                            // Fade all except city country
                            let code = selectedCity.country;
                            let cityCountryId = null;
                            if (code && countryCodeMap[code]) {
                              cityCountryId = countryCodeMap[code].id;
                            }
                            return country.id === cityCountryId ? 0.1 : 0;
                          })()
                        : selectedCountryId
                        ? country.id === selectedCountryId
                          ? 1
                          : 0.1
                        : 1
                    }
                    cursor={
                      memberCountryIds.has(country.id)
                        ? 'pointer'
                        : 'not-allowed'
                    }
                    stroke="#212121"
                    strokeWidth={0.5}
                    onClick={() => handleCountryClick(country)}
                  />
                ))}
              </g>
              {/* Bubbles group for D3 zoom/fade transitions */}
              <g ref={bubblesGroupRef} /* why: D3 transitions for zoom/fade */>
                {/* why: only render up to visibleCityCount for animated reveal */}
                {/* why: render white (default) bubbles first, then red (context) bubbles so red dots are always on top */}
                {globalCityGroupsMemo
                  .slice(0, visibleCityCount)
                  .filter((cityInfo) => !cityInfo.context)
                  .map((cityInfo) => {
                    const point = getCityPointInCountry(
                      cityInfo.city,
                      cityInfo.country
                    );
                    if (!point) return null;
                    // Opacity logic as before
                    let opacity = 1;
                    if (selectedCity) {
                      const selectedCityName = selectedCity.city
                        ?.toLowerCase()
                        .trim();
                      const cityInfoName = cityInfo.city?.toLowerCase().trim();
                      opacity =
                        selectedCityName &&
                        cityInfoName &&
                        selectedCityName === cityInfoName
                          ? 1
                          : 0.05;
                    } else if (selectedCountryId) {
                      if (!cityInfo.country) opacity = '';
                      else if (countryCodeMap[cityInfo.country]) {
                        const bubbleCountryId =
                          countryCodeMap[cityInfo.country].id;
                        opacity = bubbleCountryId === selectedCountryId ? 1 : 0;
                      } else {
                        opacity = 0;
                      }
                    }
                    return (
                      <circle
                        key={cityInfo.city}
                        cx={point[0]}
                        cy={point[1]}
                        r={1}
                        fill={BUBBLE_STYLES.default.fill}
                        stroke={BUBBLE_STYLES.default.stroke}
                        strokeWidth={0.1}
                        opacity={opacity}
                        style={{
                          pointerEvents:
                            selectedCountry && cityInfo.context
                              ? 'auto'
                              : 'none',
                          cursor:
                            selectedCountry && cityInfo.context
                              ? 'pointer'
                              : 'default',
                        }}
                        onMouseOver={(e) => handleBubbleMouseOver(e, cityInfo)}
                        onMouseOut={handleBubbleMouseOut}
                        onClick={() =>
                          cityInfo.context && handleCityClick(cityInfo)
                        }
                      />
                    );
                  })}
                {globalCityGroupsMemo
                  .slice(0, visibleCityCount)
                  .filter((cityInfo) => cityInfo.context)
                  .map((cityInfo) => {
                    const point = getCityPointInCountry(
                      cityInfo.city,
                      cityInfo.country
                    );
                    if (!point) return null;
                    // Opacity logic as before
                    let opacity = 1;
                    if (selectedCity) {
                      const selectedCityName = selectedCity.city
                        ?.toLowerCase()
                        .trim();
                      const cityInfoName = cityInfo.city?.toLowerCase().trim();
                      opacity =
                        selectedCityName &&
                        cityInfoName &&
                        selectedCityName === cityInfoName
                          ? 1
                          : 0.05;
                    } else if (selectedCountryId) {
                      if (!cityInfo.country) opacity = '';
                      else if (countryCodeMap[cityInfo.country]) {
                        const bubbleCountryId =
                          countryCodeMap[cityInfo.country].id;
                        opacity = bubbleCountryId === selectedCountryId ? 1 : 0;
                      } else {
                        opacity = 0;
                      }
                    }
                    return (
                      <circle
                        key={cityInfo.city}
                        cx={point[0]}
                        cy={point[1]}
                        r={2}
                        fill={BUBBLE_STYLES.context.fill}
                        stroke={BUBBLE_STYLES.context.stroke}
                        strokeWidth={0.1}
                        opacity={opacity}
                        style={{
                          pointerEvents:
                            selectedCountry && cityInfo.context
                              ? 'auto'
                              : 'none',
                          cursor:
                            selectedCountry && cityInfo.context
                              ? 'pointer'
                              : 'default',
                        }}
                        onMouseOver={(e) => handleBubbleMouseOver(e, cityInfo)}
                        onMouseOut={handleBubbleMouseOut}
                        onClick={() =>
                          cityInfo.context && handleCityClick(cityInfo)
                        }
                      />
                    );
                  })}
              </g>
            </svg>
            {/* Tooltip as React element */}
            {tooltip.visible && (
              <div
                className="tooltip"
                style={{
                  position: 'fixed',
                  top: tooltip.y + 10,
                  left: tooltip.x + 10,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: '#d4d4d4',
                  padding: '8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  pointerEvents: 'none',
                  zIndex: 1000,
                }}
              >
                {tooltip.content}
              </div>
            )}
            {isLoading && (
              <div
                className="loading-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="spinner"
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid rgba(255, 0, 0, 0.3)',
                    borderTop: '4px solid rgba(255, 0, 0, 1)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default WorldMapWithUsers;
