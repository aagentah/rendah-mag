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

class StripeMetrics extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  render() {
    const playground = async () => {
      const response = await fetch(
        `https://rendahmag.com/api/stripe/playground`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }
      );

      if (response.ok) {
        // Success
        console.log("response.json()", response.json());
      }
    };
    playground();

    if (true) {
      return <>aaa</>;
    }

    return false;
  }
}

export default StripeMetrics;
