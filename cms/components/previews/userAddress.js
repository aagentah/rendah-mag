/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "part:@sanity/base/client";
// import { assemblePageUrl, websiteUrl, toPlainText } from "./frontendUtils";
import styles from "./userAddress.css";

const builder = imageUrlBuilder(sanityClient);

class TwitterCard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  render() {
    const getDominionUsers = async (preview) => {
      const results = await sanityClient.fetch(
        `*[_type == "user" && isDominion] [0..13] {
          name,
          handle,
          avatar,
          address,
        }`
      );
      this.setState({ results });
      return results;
    };

    getDominionUsers();

    if (this.state.results.length) {
      return (
        <section className={styles.row}>
          {this.state.results.map((user) => (
            <article className={styles.column}>
              <div className={styles.label}>
                <p>
                  {user?.name && (
                    <>
                      {user?.name}
                      <br />
                    </>
                  )}
                  {user?.address?.line1 && (
                    <>
                      {user?.address?.line1}
                      <br />
                    </>
                  )}
                  {user?.address?.line2 && (
                    <>
                      {user?.address?.line2}
                      <br />
                    </>
                  )}
                  {user?.address?.city && (
                    <>
                      {user?.address?.city}
                      <br />
                    </>
                  )}
                  {user?.address?.state && (
                    <>
                      {user?.address?.state}
                      <br />
                    </>
                  )}
                  {user?.address?.postal_code && (
                    <>
                      {user?.address?.postal_code}
                      <br />
                    </>
                  )}
                  {user?.address?.country && (
                    <>
                      {user?.address?.country}
                      <br />
                    </>
                  )}
                </p>
              </div>
            </article>
          ))}
        </section>
      );
    }

    return false;
  }
}

export default TwitterCard;
