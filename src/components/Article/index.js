/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Sections from './Sections';
import { convertDate, toTitleCase, toUrlCase } from '../../functions';
import AuthorInfo from '../../containers/Fragments/AuthorInfo';
import LatestArticles from '../../containers/Fragments/LatestArticles';
import SubscribeBanner from '../SubscribeBanner';
import ExtraArticles from '../../containers/Fragments/ExtraArticles';

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
    console.log('articleHeight');
    console.log(articleHeight);

    if (articleHeight < 900) {
      sideBarSize = 1;
    }
    if (articleHeight >= 900) {
      sideBarSize = 2;
    }
    // if (articleHeight >= 1000) {
    //   sideBarSize = 3;
    // }
    // if (articleHeight >= 2000) {
    //   sideBarSize = 4;
    // }

    this.setState({ sideBarSize });
  }

  date = date => convertDate(date);

  render() {
    const article = this.props.info;
    const authorInfoMatch = { params: { id: toUrlCase(article.author) } };
    let sideBarLatestArticles;
    let sideBarExtraArticles;

    if (this.state.sideBarSize >= 1) {
      sideBarLatestArticles = (
        <React.Fragment>
          <p className="t-title  grey  f5  pl4  pv2">Latest</p>
          <LatestArticles limit={4} type="list" />

          <div className="pv3  pv0-lg">
            <p className="t-title  grey  f5  pl4  pv2">Subscribe to Rendah</p>
            <SubscribeBanner />
          </div>
        </React.Fragment>
      );
    }
    if (this.state.sideBarSize >= 2) {
      sideBarExtraArticles = (
        <React.Fragment>
          <p className="t-title  grey  f5  pl4  pv2">More</p>
          <ExtraArticles limit={4} type="list" />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="article">

          <figure className="rel  article__hero">
            <div className="article__hero--background" style={{ backgroundImage: `url(https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img})` }} />
            <img className="article__hero--img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
          </figure>

          <section className="container-large  center  ph0  mt5  rel">
            <div className="flex  flex-wrap">
              <div className="col-24  col-3-lg" />
              <article ref={(articleElem) => { this.articleElem = articleElem; }} className="col-18  center  col-15-lg  pr5-lg">
                <div className="article__social  pb4">
                  <a className="ph1" href={`https://www.facebook.com/sharer.php?u=https://www.rendahmag.com/article/${article.url}`} rel="noopener noreferrer" target="_blank">
                    <img src={require('../../containers/App/assets/social/iconmonstr-facebook-5.png')} alt="facebook" />
                  </a>
                  <a className="ph1" href={`https://twitter.com/share?url=https://www.rendahmag.com/article/${article.url}`} rel="noopener noreferrer" target="_blank">
                    <img src={require('../../containers/App/assets/social/iconmonstr-twitter-5.png')} alt="twitter" />
                  </a>
                </div>

                <span className="grey  t8">{this.date(article.created)} | </span>
                <Link to={`/author/${article.author}`} className="no-underline"><span className="grey  t8  cp  link">{toTitleCase(article.author)}</span></Link>
                <h1 className="pb3  pt4  t-title">{article.title}</h1>
                <p className="pv3  t-body  f5  dark-grey">{article.description}</p>

                <Sections data={article.body} />
                <AuthorInfo article padding="pt5" match={authorInfoMatch} />
              </article>

              <div className="col-24  col-6-lg  mt4  mt5-lg  pt4">
                {sideBarLatestArticles}
                {sideBarExtraArticles}
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  info: PropTypes.shape(),
};

Article.defaultProps = {
  info: {},
};

export default Article;
