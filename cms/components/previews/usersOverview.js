/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "part:@sanity/base/client";
// import { assemblePageUrl, websiteUrl, toPlainText } from "./frontendUtils";
import styles from "./userAddress.css";
import { countries } from "./country-alpha-codes.js";
import countBy from "lodash/countBy";

const builder = imageUrlBuilder(sanityClient);

class UsersOverview extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      results: []
    };
  }

  render() {
    const ukCodes = ["GB", "United Kingdom", "Jersey"];

    const usCanadaCodes = ["US", "CA"];

    const europeanCodes = [
      "AL",
      "AD",
      "AM",
      "AT",
      "BY",
      "BE",
      "BA",
      "BG",
      "CH",
      "CY",
      "CZ",
      "DE",
      "DK",
      "EE",
      "ES",
      "FO",
      "FI",
      "FR",
      "GE",
      "GI",
      "GR",
      "HU",
      "HR",
      "IE",
      "IS",
      "IT",
      "LI",
      "LT",
      "LU",
      "LV",
      "MC",
      "MK",
      "MT",
      "NO",
      "NL",
      "PL",
      "PT",
      "RO",
      "RS",
      "RU",
      "SE",
      "SI",
      "SK",
      "SM",
      "TR",
      "UA",
      "VA"
    ];

    const getDominionUsers = async preview => {
      const results = await sanityClient.fetch(
        `*[_type == "user" && isDominion] | order(dominionSince asc) {
          username,
          dominionSince,
          name,
          handle,
          avatar,
          address,
          tags,
        }`
      );
      this.setState({ results });
      return results;
    };

    const parseCountryCode = country => {
      for (let i = 0; i < countries.length; i++) {
        if (country === countries[i].code) return countries[i].name;
      }

      return country;
    };

    const countCountry = countries => {
      const count = _.countBy(this.state.results, "address.country");
      console.log("count", count);
      let thisCount = 0;

      for (let i = 0; i < countries.length; i++) {
        const country = countries[i];

        if (count[country]) {
          thisCount += count[country];
        }
      }

      return thisCount;
    };

    getDominionUsers();

    if (this.state.results.length) {
      return (
        <>
          <table className={styles.table}>
            <tr>
              <th>Dominion Members</th>
            </tr>
            <tr>
              <td>{this.state.results.length}</td>
            </tr>
          </table>

          <table className={styles.table}>
            <tr>
              <th>UK</th>
              <th>USA/Canada</th>
              <th>Europe</th>
              <th>Other</th>
            </tr>
            <tr>
              <td>{countCountry([...ukCodes])}</td>
              <td>{countCountry([...usCanadaCodes])}</td>
              <td>{countCountry([...europeanCodes])}</td>
              <td>
                {this.state.results.length -
                  (countCountry([...ukCodes]) +
                    countCountry([...usCanadaCodes]) +
                    countCountry([...europeanCodes]))}
              </td>
            </tr>
          </table>

          <table className={styles.table}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Dominion Since</th>
              <th>Tags</th>
            </tr>
            {this.state.results.map(user => (
              <tr>
                <td>{user?.name}</td>
                <td>{user?.username}</td>
                <td>{user?.dominionSince}</td>
                <td>{user?.tags?.length && user?.tags.toString()}</td>
              </tr>
            ))}
          </table>
        </>
      );
    }

    return false;
  }
}

export default UsersOverview;
