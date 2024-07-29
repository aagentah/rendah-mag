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

  const parseCountryCode = (country) => {
    const countries = [
      { code: "GB", name: "United Kingdom" },
      { code: "US", name: "United States" },
      { code: "CA", name: "Canada" },
      // Add more country codes as needed
    ];
    const countryObj = countries.find((c) => c.code === country);
    return countryObj ? countryObj.name : country;
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
  const usCanadaCodes = ["US", "CA"];
  const europeanCodes = ["FR", "DE", "IT"]; // Add more European country codes as needed

  if (results.length > 0) {
    return (
      <div>
        <h2>Total Dominion Members: {results.length}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UK</td>
              <td>{countCountry(ukCodes)}</td>
            </tr>
            <tr>
              <td>USA/Canada</td>
              <td>{countCountry(usCanadaCodes)}</td>
            </tr>
            <tr>
              <td>Europe</td>
              <td>{countCountry(europeanCodes)}</td>
            </tr>
            <tr>
              <td>Other</td>
              <td>
                {results.length -
                  countCountry([
                    ...ukCodes,
                    ...usCanadaCodes,
                    ...europeanCodes,
                  ])}
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
