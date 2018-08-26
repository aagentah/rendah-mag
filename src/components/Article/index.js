/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Seo from './Seo';
import Sections from './Sections';
import { convertDate, toTitleCase, toUrlCase } from '../../functions';
import AuthorInfo from '../../containers/Fragments/AuthorInfo';
import ExtraArticles from '../../containers/Fragments/ExtraArticles';

export class Article extends PureComponent {
  date = date => convertDate(date);

  render() {
    const article = this.props.info;
    const authorInfoMatch = { params: { id: toUrlCase(article.author) } };
    console.log('article');
    console.log(article);

    return (
      <React.Fragment>
        <Seo data={article} />
        <div className="article">

          <figure className="rel  article__hero">
            <div className="article__hero--background" style={{ backgroundImage: `url(https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img})` }} />
            <img className="article__hero--img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
          </figure>

          <section className="rel">
            <article className="container-large  center  mt5">
              <div className="flex  flex-wrap">
                <div className="col-24  col-3-lg" />
                <div className="col-24  col-15-lg  pr5-lg">
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
                </div>
                <div className="col-24 col-6-lg  mt5  pt4">
                  <p className="t-title  grey  f5  pl4  pv2">Latest</p>
                  <ExtraArticles type="list" />
                </div>
              </div>
            </article>
          </section>

          <AuthorInfo match={authorInfoMatch} seo={false} />
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
