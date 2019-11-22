/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FacebookProvider, Page } from 'react-facebook';
import { Image, Heading, Copy, Label } from 'rendah-pattern-library';

import Sections from './Sections';
import SocialLinks from './SocialLinks';

import { convertDate } from '../../functions';
import TeamMember from '../TeamMember';

import LatestArticles from '../../containers/Fragments/Blog/LatestArticles';
import SubscribeBanner from '../SubscribeBanner';
import ExtraArticles from '../../containers/Fragments/Blog/ExtraArticles';

import Seo from './Seo';

export class Article extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sideBarSize: 0,
    };
  }

  componentDidMount() {
    const articleHeight = this.articleElem.clientHeight;
    let sideBarSize = 0;

    if (articleHeight < 1000) {
      sideBarSize = 1;
    }
    if (articleHeight >= 1000) {
      sideBarSize = 2;
    }

    this.setState({ sideBarSize });
  }

  date = date => convertDate(date);

  render() {
    const article = this.props.info;
    const { teamMember } = article;
    let sideBarLatestArticles;
    let sideBarExtraArticles;

    if (this.state.sideBarSize >= 1) {
      sideBarLatestArticles = (
        <React.Fragment>
          <p className="t-title  grey  f5  pl3  pl4-md  pt3  pt2-md  pb2">Latest</p>
          <LatestArticles range={[1, 4]} type="list" />

          <div className="container  center  pv3  pv0-md">
            <p className="t-title  grey  f5  pv2">Subscribe to Rendah</p>
            <div className="mw7  relative">
              <SubscribeBanner />
            </div>
          </div>
        </React.Fragment>
      );
    }
    if (this.state.sideBarSize >= 2) {
      sideBarExtraArticles = (
        <React.Fragment>
          <p className="t-title  grey  f5  pl3  pl4-md  pt2  pb3  pb2-md">More</p>
          <ExtraArticles range={[1, 4]} type="list" />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Seo
          title={article.title}
          slug={article.slug}
          description={article.description}
          img={article.img}
          created={article.created}
          teamMember={teamMember.name}
        />

        <div className="article">
          <section className="container-large  mla  mra  ph0  rel">
            <div className="flex  flex-wrap">
              <div className="col-24  col-6-lg" />

              <article
                ref={(articleElem) => {
                  this.articleElem = articleElem;
                }}
                className="col-18  mla  mra  col-12-lg  ph4-lg"
              >
                <div className="mla  mra  mt3  mb4">
                  <Image
                    /* Options */
                    src={article.img}
                    placeholder={`${article.img}?w=100`}
                    alt={article.title}
                    figcaption={null}
                    height={null}
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <Label
                  /* Options */
                  type={'date'}
                  text={this.date(article.created)}
                  color={'black'}
                  backgroundColor={'white'}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />

                <Label
                  /* Options */
                  type={'author'}
                  text={teamMember.name}
                  color={'black'}
                  backgroundColor={'white'}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'internal',
                    url: `/team/${teamMember.slug}`,
                    target: '_top',
                    routerLink: Link,
                  }}
                />

                <div className="pt2  pb3">
                  <Heading
                    /* Options */
                    htmlEntity={'h1'}
                    text={article.title}
                    color={'black'}
                    size={'large'}
                    truncate={null}
                    reveal
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <Copy
                  /* Options */
                  text={article.description}
                  color={'black'}
                  size={'medium'}
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />

                <Sections body={article.body} />
                <SocialLinks article={article} />
                <TeamMember article padding="pt4  pt5-sm" info={teamMember} />
              </article>

              <div className="col-24  col-6-lg  pr4-lg  mt3">
                {sideBarLatestArticles}
                {sideBarExtraArticles}
                <div className="container-medium  tac  dn  db-lg  pt3">
                  <FacebookProvider appId="154881868603516">
                    <Page href="https://www.facebook.com/rendahmag" />
                  </FacebookProvider>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  info: PropTypes.shape({
    article: PropTypes.shape({}),
    teamMember: PropTypes.shape({}),
  }),
};

Article.defaultProps = {
  info: {
    article: {},
    teamMember: {},
  },
};

export default Article;
