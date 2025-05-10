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
    fill: 'rgb(170, 170, 170, 0.7)',
    stroke: 'rgb(170, 170, 170, 8)',
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
  const svgRef = useRef(null);
  const gCountriesRef = useRef(null);
  const gBubblesRef = useRef(null);
  const currentTransform = useRef('translate(0,0) scale(1)');
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

  const getCityPointInCountry = useCallback(
    (key) => {
      const projection = projectionMemo;
      if (!projection) return null;
      const lowerKey = key.toLowerCase();
      if (cityCoords[lowerKey]) {
        return projection(cityCoords[lowerKey]);
      }
      let country = lookupCaseInsensitive(cityData, key);
      if (!country) {
        const code = countryNameToCodeMap[lowerKey];
        if (code) {
          country = lookupCaseInsensitive(cityData, code);
        }
        if (!country) {
          const matchingCode = findCountryCode(key);
          if (matchingCode) {
            country = lookupCaseInsensitive(cityData, matchingCode);
          }
        }
      }
      if (!country || !country.coordinates || !country.coordinates.length) {
        return null;
      }
      return projection([country.coordinates[1], country.coordinates[0]]);
    },
    [cityCoords, cityData, projectionMemo]
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
            const point = getCityPointInCountry(cityInfo.city);
            if (point) {
              const scale = scaleValue;
              const translate = [
                dimensions.width / 2 - scale * point[0],
                dimensions.height / 2 - scale * point[1],
              ];
              const transformString = `translate(${translate}) scale(${scale})`;
              currentTransform.current = transformString;
              gCountriesRef.current
                .transition()
                .duration(750)
                .attr('transform', transformString);
              gBubblesRef.current
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
    if (users.length === 0) return;
    const uniqueCities = Array.from(
      new Set(
        users.map((u) => u.city && u.city.toLowerCase().trim()).filter(Boolean)
      )
    );
    const citiesToFetch = uniqueCities.filter(
      (city) => !(city in cityCoordsRef.current)
    );
    if (citiesToFetch.length === 0) {
      setIsCityCoordsFetched(true);
      return;
    }
    Promise.all(
      citiesToFetch.map(async (city) => {
        try {
          const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city
          )}&count=1&language=en&format=json`;
          const response = await fetch(url);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            return { city, coords: [result.longitude, result.latitude] };
          }
        } catch {
          return { city, coords: null };
        }
        return { city, coords: null };
      })
    ).then((results) => {
      results.forEach(({ city, coords }) => {
        if (coords) {
          cityCoordsRef.current[city] = coords;
        }
      });
      setCityCoords({ ...cityCoordsRef.current });
      setIsCityCoordsFetched(true);
    });
  }, [users]);

  useEffect(() => {
    if (
      !mapData ||
      !projectionMemo ||
      !pathMemo ||
      !filteredCountriesMemo.length
    )
      return;
    if (!svgRef.current) {
      svgRef.current = d3
        .select(mapRef.current)
        .append('svg')
        .style('width', '100%')
        .style('height', 'auto');
      gCountriesRef.current = svgRef.current.append('g');
      gBubblesRef.current = svgRef.current.append('g');
      svgRef.current
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'rgba(0,0,0,0.7)')
        .style('color', '#d4d4d4')
        .style('padding', '8px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none');
    }
    const featureCollection = {
      type: 'FeatureCollection',
      features: filteredCountriesMemo,
    };
    const [[x0, y0], [x1, y1]] = pathMemo.bounds(featureCollection);
    const boxWidth = x1 - x0;
    const boxHeight = y1 - y0;
    svgRef.current.attr('viewBox', `${x0} ${y0} ${boxWidth} ${boxHeight}`);

    const memberCountryIds = new Set();
    normalizedUsers.forEach((u) => {
      if (u.countryCode && countryCodeMap[u.countryCode]) {
        memberCountryIds.add(countryCodeMap[u.countryCode].id);
      }
    });

    const countriesSel = gCountriesRef.current
      .selectAll('path.country')
      .data(filteredCountriesMemo, (d) => d.id);

    countriesSel
      .enter()
      .append('path')
      .attr('class', 'country')
      .merge(countriesSel)
      .attr('d', pathMemo)
      .attr('fill', (d) => (memberCountryIds.has(d.id) ? '#525252' : '#404040'))
      .attr('opacity', '1')
      .attr('cursor', (d) =>
        memberCountryIds.has(d.id) ? 'pointer' : 'not-allowed'
      )
      .attr('stroke', '#212121')
      .attr('stroke-width', 0.5)
      .on('click', function (event, d) {
        if (!memberCountryIds.has(d.id)) return;
        let countryName = 'Selected Country';
        for (const [code, data] of Object.entries(countryCodeMap)) {
          if (data.id === d.id) {
            countryName = Array.isArray(data.name) ? data.name[0] : data.name;
            break;
          }
        }
        const [[cx0, cy0], [cx1, cy1]] = pathMemo.bounds(d);
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
        currentTransform.current = transformString;
        gCountriesRef.current
          .transition()
          .duration(750)
          .attr('transform', transformString);
        gBubblesRef.current
          .transition()
          .duration(750)
          .attr('transform', transformString);
        setSelectedCountryId(d.id);
        setSelectedCountry(countryName);
        setSelectedCity(null);
      });

    countriesSel.exit().remove();
  }, [
    mapData,
    projectionMemo,
    pathMemo,
    filteredCountriesMemo,
    dimensions,
    normalizedUsers,
  ]);

  const globalCityGroupsMemo = useMemo(() => {
    const byCity = {};
    normalizedUsers.forEach((u) => {
      if (!u.city) return;
      const key = u.city.toLowerCase().trim();
      if (!byCity[key]) {
        byCity[key] = {
          city: u.city,
          count: 0,
          country: u.countryCode,
          context: false,
          users: [],
        };
      }
      byCity[key].count++;
      if (u.quote) byCity[key].context = true;
      byCity[key].users.push(u);
    });
    return Object.values(byCity).filter((ci) => getCityPointInCountry(ci.city));
  }, [normalizedUsers, getCityPointInCountry]);

  useEffect(() => {
    if (!gBubblesRef.current) return;
    const fixedRadius = 1;
    const fixedRadiusContext = 2;

    const bubbles = gBubblesRef.current
      .selectAll('circle')
      .data(globalCityGroupsMemo, (d) => d.city);

    bubbles
      .enter()
      .append('circle')
      .merge(bubbles)
      .attr('cx', (d) => getCityPointInCountry(d.city)[0])
      .attr('cy', (d) => getCityPointInCountry(d.city)[1])
      .attr('r', (d) => (d.context ? fixedRadiusContext : fixedRadius))
      .attr(
        'fill',
        (d) => BUBBLE_STYLES[d.context ? 'context' : 'default'].fill
      )
      .attr(
        'stroke',
        (d) => BUBBLE_STYLES[d.context ? 'context' : 'default'].stroke
      )
      .attr('stroke-width', 0.1)
      .each(function (d) {
        applyInteractivity(d3.select(this), d, 6);
      });

    bubbles.exit().remove();
    gBubblesRef.current
      .selectAll('circle')
      .sort((a, b) => d3.ascending(a.context ? 1 : 0, b.context ? 1 : 0));
  }, [globalCityGroupsMemo, applyInteractivity]);

  useEffect(() => {
    if (!svgRef.current) return;
    if (selectedCity) {
      let code = selectedCity.country;
      let cityCountryId = null;
      if (code && countryCodeMap[code]) {
        cityCountryId = countryCodeMap[code].id;
      }
      svgRef.current
        .selectAll('path.country')
        .transition()
        .duration(750)
        .attr('opacity', (d) => (d.id === cityCountryId ? '0.1' : '0'));
    } else if (selectedCountryId) {
      svgRef.current
        .selectAll('path.country')
        .transition()
        .duration(750)
        .attr('opacity', (d) => (d.id === selectedCountryId ? '1' : '0.1'));
    } else {
      svgRef.current
        .selectAll('path.country')
        .transition()
        .duration(750)
        .attr('opacity', '1');
    }
  }, [selectedCity, selectedCountryId]);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current
      .select('g:nth-of-type(2)')
      .selectAll('circle')
      .transition()
      .duration(750)
      .attr('opacity', function () {
        if (selectedCity) return '0.05';
        if (!selectedCountryId) return '1';
        const cityInfo = d3.select(this).datum();
        if (!cityInfo || !cityInfo.country) return '';
        if (countryCodeMap[cityInfo.country]) {
          const bubbleCountryId = countryCodeMap[cityInfo.country].id;
          return bubbleCountryId === selectedCountryId ? '1' : '0';
        }
        return '0';
      });
  }, [selectedCountryId, selectedCity]);

  const filteredUsers = useMemo(
    () =>
      selectedCity && selectedCity.users
        ? selectedCity.users.filter((u) => u.quote)
        : [],
    [selectedCity]
  );

  const currentUser = filteredUsers[currentUserIndex] || null;

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
            </div>
          )}
          {selectedCountry && (
            <button
              onClick={() => {
                currentTransform.current = 'translate(0,0) scale(1)';
                gCountriesRef.current
                  .transition()
                  .duration(750)
                  .attr('transform', currentTransform.current);
                gBubblesRef.current
                  .transition()
                  .duration(750)
                  .attr('transform', currentTransform.current);
                setSelectedCountry(null);
                setSelectedCity(null);
                setSelectedCountryId(null);
                setCurrentUserIndex(0);
              }}
              className={`text-sm text-rendah-red underline flex items-center gap-x-2 mb-4  ${
                selectedCountry ? 'opacity-100' : 'opacity-50'
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
                    <div className="rich-text-spacing text-sm text-neutral-400">
                      <BlockContent
                        blocks={currentUser.quote}
                        serializers={SANITY_BLOCK_SERIALIZERS}
                      />
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
            <div
              ref={mapRef}
              className="flex items-center justify-center"
              style={{ width: '100%', height: `${dimensions.height}px` }}
            />
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
