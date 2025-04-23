import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { random } from 'lodash';
import { getDominionUsersAllTime } from '~/lib/sanity/requests';
import { countryCodeMap, countryNameToCodeMap } from '~/lib/countryCodeMap';

const WorldMapWithUsers = () => {
  const mapRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [mapData, setMapData] = useState(null);
  const [cityData, setCityData] = useState({});
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (
      !mapData ||
      !users.length ||
      dimensions.width === 0 ||
      !Object.keys(cityData).length
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

    const getCountryFeatureById = (id) =>
      filteredCountries.find((country) => country.id === id);

    const getCountryFeature = (codeOrName) => {
      const countryInfo = countryCodeMap[codeOrName];
      if (countryInfo) return getCountryFeatureById(countryInfo.id);
      const code = countryNameToCodeMap[codeOrName.toLowerCase()];
      if (code) return getCountryFeatureById(countryCodeMap[code].id);
      const arrayMatch = Object.keys(countryCodeMap).find((code) => {
        const names = countryCodeMap[code].name;
        if (Array.isArray(names)) {
          return names.some(
            (name) => name.toLowerCase() === codeOrName.toLowerCase()
          );
        }
        return false;
      });
      return arrayMatch
        ? getCountryFeatureById(countryCodeMap[arrayMatch].id)
        : null;
    };

    const getCityPointInCountry = (countryCode) => {
      let country =
        cityData[countryCode] ||
        cityData[countryCode.toUpperCase()] ||
        cityData[countryCode.toLowerCase()];
      if (!country) {
        const code = countryNameToCodeMap[countryCode.toLowerCase()];
        if (code)
          country =
            cityData[code] ||
            cityData[code.toUpperCase()] ||
            cityData[code.toLowerCase()];
        if (!country) {
          const matchingCode = Object.keys(countryCodeMap).find((code) => {
            const names = countryCodeMap[code].name;
            return (
              Array.isArray(names) &&
              names.some(
                (name) => name.toLowerCase() === countryCode.toLowerCase()
              )
            );
          });
          if (matchingCode)
            country =
              cityData[matchingCode] ||
              cityData[matchingCode.toUpperCase()] ||
              cityData[matchingCode.toLowerCase()];
        }
      }
      if (!country?.coordinates?.length) return null;
      return projection([country.coordinates[1], country.coordinates[0]]);
    };

    svg
      .selectAll('path.country')
      .data(filteredCountries)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)
      .attr('fill', 'white')
      .attr('opacity', '0.5')
      .attr('stroke', 'black')
      .attr('stroke-width', 0.75);

    const usersByLocation = {};
    users.forEach((user) => {
      if (!user.country) return;
      let countryCode = user.country;
      if (countryCode.length > 2) {
        const code = countryNameToCodeMap[countryCode.toLowerCase()];
        if (code) countryCode = code;
      }
      const key = countryCode.toUpperCase();
      if (!usersByLocation[key]) {
        let countryName = user.country;
        if (countryCodeMap[key]) {
          countryName = Array.isArray(countryCodeMap[key].name)
            ? countryCodeMap[key].name[0]
            : countryCodeMap[key].name;
        }
        usersByLocation[key] = { country: countryName, count: 0, point: null };
      }
      usersByLocation[key].count += 1;
    });

    let plotCount = 0;
    let skippedCount = 0;
    Object.values(usersByLocation).forEach((loc) => {
      let point = getCityPointInCountry(loc.country);
      if (!point) {
        const feat = getCountryFeature(loc.country);
        if (!feat) {
          skippedCount++;
          return;
        }
        point = projection(d3.geoCentroid(feat));
      }
      if (!point) {
        skippedCount++;
        return;
      }
      loc.point = point;
      plotCount++;
    });

    const counts = Object.values(usersByLocation)
      .filter((l) => l.point)
      .map((l) => l.count);
    const bubbleScale = d3
      .scaleSqrt()
      .domain([Math.min(...counts), Math.max(...counts)])
      .range([5, window.innerWidth * 0.02]);

    const tooltip = d3
      .select(mapRef.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0,0,0,0.7)')
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none');

    Object.values(usersByLocation)
      .filter((l) => l.point)
      .forEach((loc) => {
        svg
          .append('circle')
          .attr('cx', loc.point[0])
          .attr('cy', loc.point[1])
          .attr('r', bubbleScale(loc.count))
          .attr('fill', 'rgba(255, 0, 0, 0.5)')
          .attr('stroke', 'darkred')
          .attr('stroke-width', 0.5)
          .on('mouseover', function (event) {
            tooltip
              .style('visibility', 'visible')
              .html(`${loc.country}: ${loc.count} members`)
              .style('left', event.pageX + 10 + 'px')
              .style('top', event.pageY - 28 + 'px');
          })
          .on('mousemove', function (event) {
            tooltip
              .style('left', event.pageX + 10 + 'px')
              .style('top', event.pageY - 28 + 'px');
          })
          .on('mouseout', function () {
            tooltip.style('visibility', 'hidden');
          });
      });

    console.log(
      `Successfully plotted ${plotCount} locations, skipped ${skippedCount} locations`
    );
  }, [mapData, users, dimensions, cityData]);

  return (
    <>
      <div className="pb-8">
        <h2 className="text-neutral-300">
          Active members in {new Date().getFullYear()}
        </h2>
      </div>
      <div
        ref={mapRef}
        className="flex items-center justify-center"
        style={{ width: '100%', height: 'auto' }}
      />
    </>
  );
};

export default WorldMapWithUsers;
