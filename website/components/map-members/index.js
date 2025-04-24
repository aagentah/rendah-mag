import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { random } from 'lodash';
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

const WorldMapWithUsers = () => {
  const mapRef = useRef(null);
  const currentTransform = useRef('translate(0,0) scale(1)');
  const [users, setUsers] = useState([]);
  const [mapData, setMapData] = useState(null);
  const [cityData, setCityData] = useState({});
  const [cityCoords, setCityCoords] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCityCoordsFetched, setIsCityCoordsFetched] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // compute counts for selected country
  const countryUsers = useMemo(() => {
    if (!selectedCountryId) return [];
    return users.filter((user) => {
      let code = user.country;
      if (!code) return false;
      if (code.length > 2) {
        const mapped = countryNameToCodeMap[code.toLowerCase()];
        if (mapped) code = mapped;
      }
      const info = countryCodeMap[code.toUpperCase()];
      return info ? info.id === selectedCountryId : false;
    });
  }, [users, selectedCountryId]);

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
    if (selectedCity) {
      setFadeIn(true);
    } else {
      setFadeIn(false);
    }
  }, [selectedCity]);

  const getProjection = () => {
    if (!mapData || dimensions.width === 0) return null;
    return d3
      .geoEquirectangular()
      .fitSize(
        [dimensions.width, dimensions.height],
        topojson.feature(mapData, mapData.objects.countries)
      );
  };

  const getCityPointInCountry = (key) => {
    const projection = getProjection();
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
  };

  const getCityPoint = (cityName, countryFeature) => {
    let point = getCityPointInCountry(cityName);
    if (!point && countryFeature) {
      const centroid = d3.geoCentroid(countryFeature);
      const projection = getProjection();
      if (projection) {
        point = projection(centroid);
      }
    }
    return point;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const worldData = await d3.json('/map/world-110m.json');
        setMapData(worldData);
        const userData = await getDominionUsersAllTime();
        setUsers(userData);
        console.log('userData:', userData);
        const cities = await fetchCityData();
        setCityData(cities);
        console.log('Loaded cities data for countries');
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
    if (
      mapData &&
      users.length > 0 &&
      Object.keys(cityData).length > 0 &&
      isCityCoordsFetched
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
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
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (users.length === 0) return;
    const uniqueCities = new Set();
    users.forEach((user) => {
      if (user.city) {
        uniqueCities.add(user.city.toLowerCase().trim());
      }
    });
    const citiesToFetch = Array.from(uniqueCities).filter(
      (city) => !(city in cityCoords)
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
        } catch (error) {
          console.error('Error fetching geocoding for city:', city, error);
        }
        return { city, coords: null };
      })
    ).then((results) => {
      setCityCoords((prev) => {
        const newCoords = { ...prev };
        results.forEach(({ city, coords }) => {
          if (coords) {
            newCoords[city] = coords;
          }
        });
        return newCoords;
      });
      setIsCityCoordsFetched(true);
    });
  }, [users]);

  useEffect(() => {
    if (selectedCity) {
      setCurrentUserIndex(0);
    }
  }, [selectedCity]);

  const applyInteractivity = (bubble, cityInfo, scaleValue) => {
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
        .on('mouseover', function (event) {
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
            d3.select(mapRef.current)
              .select('svg')
              .select('g:first-of-type')
              .transition()
              .duration(750)
              .attr('transform', transformString);
            d3.select(mapRef.current)
              .select('svg')
              .select('g:nth-of-type(2)')
              .transition()
              .duration(750)
              .attr('transform', transformString);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (
      mapRef.current &&
      d3.select(mapRef.current).select('svg').size() > 0 &&
      d3
        .select(mapRef.current)
        .select('svg')
        .select('g:nth-of-type(2)')
        .size() > 0
    ) {
      const gBubbles = d3
        .select(mapRef.current)
        .select('svg')
        .select('g:nth-of-type(2)');
      gBubbles.selectAll('circle').each(function (cityInfo) {
        const bubble = d3.select(this);
        if (!cityInfo) return;
        applyInteractivity(bubble, cityInfo, 24);
      });
    }
  }, [selectedCountry]);

  const handleReset = () => {
    const gCountries = d3
      .select(mapRef.current)
      .select('svg')
      .select('g:first-of-type');
    const gBubbles = d3
      .select(mapRef.current)
      .select('svg')
      .select('g:nth-of-type(2)');
    currentTransform.current = 'translate(0,0) scale(1)';
    gCountries
      .transition()
      .duration(750)
      .attr('transform', currentTransform.current);
    gBubbles
      .transition()
      .duration(750)
      .attr('transform', currentTransform.current);
    d3.select(mapRef.current)
      .transition()
      .duration(750)
      .style('transform', 'translateX(0px)');
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedCountryId(null);
    setCurrentUserIndex(0);
  };

  const handlePrevUser = () => {
    if (!selectedCity || !selectedCity.users) return;
    const filtered = selectedCity.users.filter((u) => u.quote);
    if (filtered.length <= 1) return;
    setCurrentUserIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  };

  const handleNextUser = () => {
    if (!selectedCity || !selectedCity.users) return;
    const filtered = selectedCity.users.filter((u) => u.quote);
    if (filtered.length <= 1) return;
    setCurrentUserIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (
      !mapData ||
      !users.length ||
      dimensions.width === 0 ||
      Object.keys(cityData).length === 0
    )
      return;
    d3.select(mapRef.current).select('svg').remove();

    const projection = d3
      .geoEquirectangular()
      .fitSize(
        [dimensions.width, dimensions.height],
        topojson.feature(mapData, mapData.objects.countries)
      );
    const path = d3.geoPath().projection(projection);

    const countries = topojson.feature(
      mapData,
      mapData.objects.countries
    ).features;
    const filteredCountries = countries.filter((country) => {
      const centroid = d3.geoCentroid(country);
      return centroid[1] < 80 && centroid[1] > -80;
    });

    const featureCollection = {
      type: 'FeatureCollection',
      features: filteredCountries,
    };
    const [[x0, y0], [x1, y1]] = path.bounds(featureCollection);
    const boxWidth = x1 - x0;
    const boxHeight = y1 - y0;

    const svg = d3
      .select(mapRef.current)
      .append('svg')
      .attr('viewBox', `${x0} ${y0} ${boxWidth} ${boxHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('width', '100%')
      .style('height', 'auto');

    const gCountries = svg.append('g');
    const gBubbles = svg.append('g');

    if (currentTransform.current) {
      gCountries.attr('transform', currentTransform.current);
      gBubbles.attr('transform', currentTransform.current);
    }

    let tooltip = d3.select(mapRef.current).select('.tooltip');
    if (tooltip.empty()) {
      tooltip = d3
        .select(mapRef.current)
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

    const memberCountryIds = new Set();
    users.forEach((user) => {
      if (!user.country) return;
      let code = user.country;
      if (code && code.length > 2) {
        const mapped = countryNameToCodeMap[code.toLowerCase()];
        if (mapped) code = mapped;
      }
      if (code && countryCodeMap[code.toUpperCase()]) {
        memberCountryIds.add(countryCodeMap[code.toUpperCase()].id);
      }
    });

    gCountries
      .selectAll('path.country')
      .data(filteredCountries)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)
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
        const [[cx0, cy0], [cx1, cy1]] = path.bounds(d);
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
        gCountries
          .transition()
          .duration(750)
          .attr('transform', transformString);
        gBubbles.transition().duration(750).attr('transform', transformString);
        setSelectedCountryId(d.id);
        setSelectedCountry(countryName);
      });

    const createCityBubbles = () => {
      gBubbles.selectAll('circle').remove();
      const globalUsersByCity = {};
      users.forEach((user) => {
        if (!user.city) return;
        const key = user.city.toLowerCase().trim();
        if (!globalUsersByCity[key]) {
          globalUsersByCity[key] = {
            city: user.city,
            count: 0,
            country: user.country,
            context: false,
            users: [],
          };
        }
        globalUsersByCity[key].count++;
        if (user.quote) {
          globalUsersByCity[key].context = true;
        }
        globalUsersByCity[key].users.push(user);
      });
      const globalCityGroups = Object.values(globalUsersByCity).filter(
        (cityInfo) => {
          return getCityPointInCountry(cityInfo.city);
        }
      );
      if (globalCityGroups.length) {
        const fixedRadius = 1;
        const fixedRadiusContext = 2;

        globalCityGroups.forEach((cityInfo) => {
          const point = getCityPointInCountry(cityInfo.city);
          if (point) {
            const bubbleCircle = gBubbles
              .append('circle')
              .attr('cx', point[0])
              .attr('cy', point[1])
              .attr('r', cityInfo.context ? fixedRadiusContext : fixedRadius)
              .attr(
                'fill',
                BUBBLE_STYLES[cityInfo.context ? 'context' : 'default'].fill
              )
              .attr(
                'stroke',
                BUBBLE_STYLES[cityInfo.context ? 'context' : 'default'].stroke
              )
              .attr('stroke-width', 0.1)
              .style('pointer-events', 'none')
              .style('cursor', 'default');
            bubbleCircle.datum(cityInfo);
          }
        });
      }
    };

    const updateCityBubbleInteractivity = () => {
      gBubbles.selectAll('circle').each(function (cityInfo) {
        const bubble = d3.select(this);
        applyInteractivity(bubble, cityInfo, 6);
      });
    };

    createCityBubbles();
    updateCityBubbleInteractivity();
    gBubbles
      .selectAll('circle')
      .sort((a, b) => d3.ascending(a.context ? 1 : 0, b.context ? 1 : 0));
  }, [mapData, users, dimensions, cityData, cityCoords]);

  useEffect(() => {
    if (!mapData) return;
    const svg = d3.select(mapRef.current).select('svg');
    if (selectedCity) {
      let code = selectedCity.country;
      if (code && code.length > 2) {
        const mapped = countryNameToCodeMap[code.toLowerCase()];
        if (mapped) code = mapped;
      }
      let cityCountryId = null;
      if (code && countryCodeMap[code.toUpperCase()]) {
        cityCountryId = countryCodeMap[code.toUpperCase()].id;
      }
      svg
        .selectAll('path.country')
        .transition()
        .duration(750)
        .attr('opacity', function (d) {
          return d.id === cityCountryId ? '0.1' : '0';
        });
    } else if (selectedCountryId) {
      svg
        .selectAll('path.country')
        .transition()
        .duration(750)
        .attr('opacity', function (d) {
          return d.id === selectedCountryId ? '1' : '0.1';
        });
    } else {
      svg
        .selectAll('path.country')
        .transition()
        .duration(750)
        .attr('opacity', '1');
    }
  }, [selectedCity, selectedCountryId, mapData]);

  useEffect(() => {
    if (!mapData) return;
    const svg = d3.select(mapRef.current).select('svg');
    svg
      .select('g:nth-of-type(2)')
      .selectAll('circle')
      .transition()
      .duration(750)
      .attr('opacity', function () {
        if (selectedCity) return '0.05';
        if (!selectedCountryId) return '1';
        const cityInfo = d3.select(this).datum();
        if (!cityInfo || !cityInfo.country) return '';
        let code = cityInfo.country;
        if (code && code.length > 2) {
          const mapped = countryNameToCodeMap[code.toLowerCase()];
          if (mapped) code = mapped;
        }
        if (code && countryCodeMap[code.toUpperCase()]) {
          const bubbleCountryId = countryCodeMap[code.toUpperCase()].id;
          return bubbleCountryId === selectedCountryId ? '1' : '0';
        }
        return '0';
      });
  }, [selectedCountryId, selectedCity, mapData]);

  const getFilteredUsers = () => {
    if (!selectedCity || !selectedCity.users) return [];
    return selectedCity.users.filter((user) => user.quote);
  };

  const getCurrentUser = () => {
    const filteredUsers = getFilteredUsers();
    if (filteredUsers.length === 0) return null;
    return filteredUsers[currentUserIndex];
  };

  const currentUser = getCurrentUser();
  const filteredUsers = getFilteredUsers();

  return (
    <>
      <div className="flex gap-x-12">
        <div className="flex flex-col gap-y-4 w-4/12 border-r border-neutral-700 pr-12">
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
              onClick={handleReset}
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

          {selectedCountry && !selectedCity && (
            <>
              <h2 className="mb-2">{selectedCountry}</h2>

              <Table
                className="text-neutral-300"
                rows={[
                  {
                    left: 'Member Cities',
                    right: citiesCount,
                  },
                  {
                    left: 'Members Count',
                    right: membersCount,
                  },
                  {
                    left: 'Member Quotes',
                    right: quoteMembersCount,
                  },
                ]}
              />
            </>
          )}

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
                        onClick={handlePrevUser}
                        className="text-xs text-neutral-300 cursor-pointer underline"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextUser}
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

        <div className="w-8/12">
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
