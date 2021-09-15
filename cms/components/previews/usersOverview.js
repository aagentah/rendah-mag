/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "part:@sanity/base/client";
// import { assemblePageUrl, websiteUrl, toPlainText } from "./frontendUtils";
import styles from "./userAddress.css";
import { countries } from "./country-alpha-codes.js";

const builder = imageUrlBuilder(sanityClient);

class UsersOverview extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  render() {
    const getDominionUsers = async (preview) => {
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

    const parseCountryCode = (country) => {
      for (let i = 0; i < countries.length; i++) {
        if (country === countries[i].code) return countries[i].name;
      }

      return country;
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
              <th>Name</th>
              <th>Email</th>
              <th>Dominion Since</th>
              <th>Tags</th>
            </tr>
            {this.state.results.map((user) => (
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
