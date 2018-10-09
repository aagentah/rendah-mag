/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class SocialLinks extends PureComponent {
  render() {
    const { article } = this.props;
    console.log(article);

    if (article.socialHandles) {
      let soundcloud = null;
      let facebook = null;
      let twitter = null;
      let instagram = null;

      if (article.socialHandles.soundcloud) {
        soundcloud = <a className="db  pv2  link  f6  black  t-body" title="soundcloud" href={`https://soundcloud.com/${article.socialHandles.soundcloud}`} rel="noopener noreferrer" target="_blank">- soundcloud/{article.socialHandles.soundcloud}</a>;
      }
      if (article.socialHandles.facebook) {
        facebook = <a className="db  pv2  link  f6  black  t-body" title="facebook" href={`https://facebook.com/${article.socialHandles.facebook}`} rel="noopener noreferrer" target="_blank">f- acebook/{article.socialHandles.facebook}</a>;
      }
      if (article.socialHandles.twitter) {
        twitter = <a className="db  pv2  link  f6  black  t-body" title="twitter" href={`https://twitter.com/${article.socialHandles.twitter}`} rel="noopener noreferrer" target="_blank">- twitter/{article.socialHandles.twitter}</a>;
      }
      if (article.socialHandles.instagram) {
        instagram = <a className="db  pv2  link  f6  black  t-body" title="instagram" href={`https://instagram.com/${article.socialHandles.instagram}`} rel="noopener noreferrer" target="_blank">- instagram/{article.socialHandles.instagram}</a>;
      }


      return (
        <div className="pt3  ph3  bt  bc-grey  mt3">
          {soundcloud}
          {facebook}
          {twitter}
          {instagram}
        </div>
      );
    }

    return false;
  }
}

SocialLinks.propTypes = {
  article: PropTypes.shape(),
};

SocialLinks.defaultProps = {
  article: {},
};

export default SocialLinks;
