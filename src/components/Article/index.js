/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Sections from './Sections';
import { convertDate, toTitleCase, toUrlCase } from '../../functions';
import AuthorInfo from '../../containers/Fragments/AuthorInfo';
import LatestArticles from '../../containers/Fragments/LatestArticles';
import ExtraArticles from '../../containers/Fragments/ExtraArticles';

export class Article extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      extraArticlesLimit: 0,
    };
  }

  componentDidMount() {
    const articleHeight = this.articleElem.clientHeight;
    switch (true) {
      case (articleHeight >= 2000):
        this.setState({ sideBarSize: 4 });
        break;
      case (articleHeight >= 1200):
        this.setState({ sideBarSize: 3 });
        break;
      case (articleHeight >= 750):
        this.setState({ sideBarSize: 2 });
        break;
      case (articleHeight < 750):
        this.setState({ sideBarSize: 1 });
        break;
      default:
    }
    console.log(articleHeight);
  }

  date = date => convertDate(date);

  render() {
    const article = this.props.info;
    const authorInfoMatch = { params: { id: toUrlCase(article.author) } };
    let sideBarLatestArticles;
    let sideBarExtraArticles;
    let sideBarExtraArticles2;
    let sideBarAuthorArticles;

    console.log(this.state.sideBarSize);

    if (this.state.sideBarSize >= 1) {
      sideBarLatestArticles = (
        <React.Fragment>
          <p className="t-title  grey  f5  pl4  pv2">Latest</p>
          <LatestArticles limit={4} type="list" />
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

    if (this.state.sideBarSize >= 3) {
      sideBarExtraArticles2 = (
        <React.Fragment>
          <p className="t-title  grey  f5  pl4  pv2">Latest</p>
          <LatestArticles limit={4} type="list" />
        </React.Fragment>
      );
    }

    if (this.state.sideBarSize >= 4) {
      sideBarAuthorArticles = (
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
              <article ref={(articleElem) => { this.articleElem = articleElem; }} className="col-24  col-15-lg  order-1  pr5-lg">
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
                <p className="pv3  t-body  grey">{article.description}</p>

                <Sections data={article.body} />

              </article>

              <div className="col-24  order-2  order-3-lg">
                <AuthorInfo padding="pv4" match={authorInfoMatch} />
              </div>

              <div className="col-24  col-6-lg  order-3  order-2-lg  mt5-lg  pt4">
                {sideBarLatestArticles}
                {sideBarExtraArticles}
                {sideBarExtraArticles2}
                {sideBarAuthorArticles}
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
