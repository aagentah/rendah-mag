/* @flow */
/* eslint-disable import/no-named-as-default, react/no-array-index-key,
react/self-closing-comp, react/prefer-stateless-function */

import React from 'react';
import Instafeed from 'react-instafeed';

// Export this for unit testing more easily
export class Instagram extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div id="instaFeed" className="row  ph5  ph2-md">
        <Instafeed
          limit="9"
          resolution="standard_resolution"
          sortBy="most-recent"
          target="instaFeed"
          template=""
          userId="6646546960"
          clientId="1375f42790124e1ba319055cd4f93ec5"
          accessToken="6646546960.1677ed0.8eb1d2cceba64706aed91890d352c904"
        />
      </div>
    );
  }
}

export default Instagram;
