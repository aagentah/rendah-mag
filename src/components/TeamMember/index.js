/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../Elements/AnimatedImage';

import Seo from './Seo';

// Export this for unit testing more easily
export class TeamMember extends PureComponent {
  render() {
    const { padding } = this.props;
    const teamMember = this.props.info;
    const { socialHandles, alias } = teamMember;

    const isArticle = this.props.article;
    const containerClass = isArticle ? 'w-100' : 'container-small  center';
    const ActiveMemberLink = teamMember.active ? Link : 'div';
    const borderClass = isArticle ? 'teamMember__border  bt  bl-sm  bw2  bc-light-grey  pt4  pt0-md' : null;

    let { facebookLink, twitterLink, instagramLink, soundcloudLink } = false;

    if (socialHandles) {
      facebookLink = socialHandles.facebook ? (
        <a title="facebook" href={`https://facebook.com/${socialHandles.facebook}`} rel="noopener noreferrer" target="_blank">
          <img
            className="dib  pr2"
            width="35"
            src={require('../../containers/App/assets/social/iconmonstr-facebook-5.png')}
            alt={socialHandles.facebook}
          />
        </a>
      ) : (false);

      twitterLink = socialHandles.twitter ? (
        <a title="twitter" href={`https://twitter.com/${socialHandles.twitter}`} rel="noopener noreferrer" target="_blank">
          <img
            className="dib  pr2"
            width="35"
            src={require('../../containers/App/assets/social/iconmonstr-twitter-5.png')}
            alt={socialHandles.twitter}
          />
        </a>
      ) : (false);

      instagramLink = socialHandles.instagram ? (
        <a title="instagram" href={`https://instagram.com/${socialHandles.instagram}`} rel="noopener noreferrer" target="_blank">
          <img
            className="dib  pr2"
            width="35"
            src={require('../../containers/App/assets/social/iconmonstr-instagram-5.png')}
            alt={socialHandles.instagram}
          />
        </a>
      ) : (false);

      soundcloudLink = socialHandles.soundcloud ? (
        <a title="soundcloud" href={`https://soundcloud.com/${socialHandles.soundcloud}`} rel="noopener noreferrer" target="_blank">
          <img
            className="dib  pr2"
            width="35"
            src={require('../../containers/App/assets/social/iconmonstr-soundcloud-5.png')}
            alt={socialHandles.soundcloud}
          />
        </a>
      ) : (false);
    }

    return (
      <React.Fragment>

        {this.props.seo ? <Seo teamMember={teamMember} /> : null}

        <div className={`${containerClass}  ${padding}`}>
          <div className={`flex  flex-wrap  ${borderClass}`}>
            <div className="col-24  col-7-sm  col-6-md  pb4  pb0-sm">
              <figure>
                <ActiveMemberLink
                  title={teamMember.slug}
                  to={`/team/${teamMember.slug}`}
                  className="link  db  h4  w4  center  shadow2  br4"
                >
                  <AnimatedImage
                    lazy
                    src={teamMember.img}
                    alt={teamMember.name}
                    styles="fade-in-zoom-in  h4  w4  center  br4"
                  />
                </ActiveMemberLink>
              </figure>
            </div>

            <div className="col-22  col-17-sm  col-18-md  center">
              <div className="flex  flex-column  justify-center  h4">
                <ActiveMemberLink
                  title={teamMember.slug}
                  to={`/team/${teamMember.slug}`}
                  className="black  f5  pt2  db  cp  t-title  no-underline  tac  tal-sm"
                >
                  <span>{teamMember.name}</span>
                  <span className="pl1  grey  f5">{(alias) ? `(${alias})` : ''}</span>
                </ActiveMemberLink>
                <p className="t-body  lh-copy  grey  f6  pt2  pb3  mb1  tac  tal-sm">{teamMember.description}</p>
                <div className="tac  tal-sm">
                  {facebookLink}
                  {twitterLink}
                  {instagramLink}
                  {soundcloudLink}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

TeamMember.propTypes = {
  info: PropTypes.shape(),
  seo: PropTypes.bool,
  article: PropTypes.bool,
  padding: PropTypes.string,
};

TeamMember.defaultProps = {
  info: {},
  seo: false,
  article: false,
  padding: '',
};

export default TeamMember;
