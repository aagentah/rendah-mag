import React, { useState, useEffect } from "react";
import sanityClient from "@sanity/client";
import { countBy } from "lodash";
import "./table.css";

const client = sanityClient({
  projectId: "q8z2vf2k",
  dataset: "production",
  useCdn: true,
});

const UsersOverview = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getDominionUsers();
  }, []);

  const getDominionUsers = async () => {
    const query = `*[_type == "user" && isDominion == true] | order(dominionSince asc)`;
    const results = await client.fetch(query);
    console.log(results);
    setResults(results);
  };

  const countCountry = (countries) => {
    const count = countBy(results, "address.country");
    console.log(count);
    let thisCount = 0;
    countries.forEach((country) => {
      if (count[country]) {
        thisCount += count[country];
      }
    });
    return thisCount;
  };

  const ukCodes = ["GB"];
  const europeZone1Codes = ["IE", "FR", "DE", "FR-Corsica", "DK", "MC"];
  const europeZone2Codes = [
    "AT",
    "LV",
    "PT-Azores",
    "LT",
    "ES-Balearic Islands",
    "LU",
    "BE",
    "PT-Madeira",
    "BG",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES-Canary Islands",
    "HR",
    "CY",
    "CZ",
    "EE",
    "FI",
    "GR",
    "HU",
    "IT",
    "SE",
  ];
  const europeZone3Codes = [
    "AL",
    "MD",
    "AD",
    "ME",
    "AM",
    "MK",
    "AZ",
    "NO",
    "BY",
    "RU",
    "BA",
    "SM",
    "FO",
    "RS",
    "GE",
    "CH",
    "GI",
    "TJ",
    "GL",
    "TR",
    "IS",
    "TM",
    "KZ",
    "UA",
    "XK",
    "UZ",
    "KG",
    "VA",
    "LI",
  ];
  const worldZone2Codes = [
    "AU",
    "PW",
    "IO",
    "CX",
    "PC",
    "CC",
    "CK",
    "CS",
    "FJ",
    "PF",
    "TF",
    "KI",
    "MO",
    "NR",
    "NC",
    "NZ",
    "NU",
    "NF",
    "NO",
    "PG",
    "LA",
    "PN",
    "SG",
    "SB",
    "TA",
    "TK",
    "TO",
    "TV",
    "AS",
    "WS",
  ];
  const worldZone3Codes = ["US"];

  const shippingRates = {
    UK: 2.5,
    EuropeZone1: 9.55,
    EuropeZone2: 10.75,
    EuropeZone3: 12.5,
    WorldZone1: 12.5,
    WorldZone2: 14.45,
    WorldZone3: 5,
  };

  const calculateTotal = () => {
    const ukCount = countCountry(ukCodes);
    const europeZone1Count = countCountry(europeZone1Codes);
    const europeZone2Count = countCountry(europeZone2Codes);
    const europeZone3Count = countCountry(europeZone3Codes);
    const worldZone2Count = countCountry(worldZone2Codes);
    const worldZone3Count = countCountry(worldZone3Codes);

    // Calculate count for World Zone 1 by excluding the counts for other zones
    const totalKnown =
      ukCount +
      europeZone1Count +
      europeZone2Count +
      europeZone3Count +
      worldZone2Count +
      worldZone3Count;

    const worldZone1Count = results.length - totalKnown;

    return (
      ukCount * shippingRates.UK +
      europeZone1Count * shippingRates.EuropeZone1 +
      europeZone2Count * shippingRates.EuropeZone2 +
      europeZone3Count * shippingRates.EuropeZone3 +
      worldZone1Count * shippingRates.WorldZone1 +
      worldZone2Count * shippingRates.WorldZone2 +
      worldZone3Count * shippingRates.WorldZone3
    );
  };

  if (results.length > 0) {
    return (
      <div>
        <h2>Total Dominion Members: {results.length}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Count</th>
              <th>Shipping Rate (£)</th>
              <th>Total Shipping Cost (£)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UK (2nd Class)</td>
              <td>{countCountry(ukCodes)}</td>
              <td>{shippingRates.UK.toFixed(2)}</td>
              <td>{(countCountry(ukCodes) * shippingRates.UK).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Europe Zone 1</td>
              <td>{countCountry(europeZone1Codes)}</td>
              <td>{shippingRates.EuropeZone1.toFixed(2)}</td>
              <td>
                {(
                  countCountry(europeZone1Codes) * shippingRates.EuropeZone1
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Europe Zone 2</td>
              <td>{countCountry(europeZone2Codes)}</td>
              <td>{shippingRates.EuropeZone2.toFixed(2)}</td>
              <td>
                {(
                  countCountry(europeZone2Codes) * shippingRates.EuropeZone2
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Europe Zone 3</td>
              <td>{countCountry(europeZone3Codes)}</td>
              <td>{shippingRates.EuropeZone3.toFixed(2)}</td>
              <td>
                {(
                  countCountry(europeZone3Codes) * shippingRates.EuropeZone3
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>World Zone 1</td>
              <td>
                {results.length -
                  (countCountry(ukCodes) +
                    countCountry(europeZone1Codes) +
                    countCountry(europeZone2Codes) +
                    countCountry(europeZone3Codes) +
                    countCountry(worldZone2Codes) +
                    countCountry(worldZone3Codes))}
              </td>
              <td>{shippingRates.WorldZone1.toFixed(2)}</td>
              <td>
                {(
                  (results.length -
                    (countCountry(ukCodes) +
                      countCountry(europeZone1Codes) +
                      countCountry(europeZone2Codes) +
                      countCountry(europeZone3Codes) +
                      countCountry(worldZone2Codes) +
                      countCountry(worldZone3Codes))) *
                  shippingRates.WorldZone1
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>World Zone 2</td>
              <td>{countCountry(worldZone2Codes)}</td>
              <td>{shippingRates.WorldZone2.toFixed(2)}</td>
              <td>
                {(
                  countCountry(worldZone2Codes) * shippingRates.WorldZone2
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>World Zone 3 (USA via USA)</td>
              <td>{countCountry(worldZone3Codes)}</td>
              <td>{shippingRates.WorldZone3.toFixed(2)}</td>
              <td>
                {(
                  countCountry(worldZone3Codes) * shippingRates.WorldZone3
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Full Total</strong>
              </td>
              <td>{results.length}</td>
              <td></td>
              <td>
                <strong>{calculateTotal().toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Dominion Since</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {results.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.dominionSince}</td>
                <td>{user.tags && user.tags.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

export default UsersOverview;
