/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FacebookProvider, { Like } from 'react-facebook';

import Seo from './Seo';
import Sections from './Sections';
import { convertDate } from '../../functions';
import AuthorInfo from '../../containers/Fragments/AuthorInfo';

export class Article extends PureComponent {
  date = date => convertDate(date);

  render() {
    const article = this.props.info;
    const authorInfoMatch = { params: { id: article.author } };

    return (
      <React.Fragment>
        <Seo data={article} />
        <div className="article">

          <figure className="rel  article__hero">
            <div className="article__hero--background" style={{ backgroundImage: `url(https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img})` }} />
            <img className="article__hero--img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
          </figure>

          <section className="rel">
            <article className="container  article__content">
              <div className="row">
                <div className="col-md-16  offset-md-4  ph4-sm">
                  <div className="article__fb-like  h2">
                    <FacebookProvider appId="154881868603516">
                      <Like href={`https://www.rendahmag.com/Article/${article.url}`} layout="button_count" width="200" share />
                    </FacebookProvider>
                  </div>
                  <span className="grey  t8">{this.date(article.created)} | </span>
                  <Link to={`/Author/${article.author.replace(/\s+/g, '-')}`} className="no-underline"><span className="grey  t8  cp  link">{article.author}</span></Link>
                  <h1 className="pb3  pt4  title-font">{article.title}</h1>
                  <p className="pv3  normal-font  grey">{article.description}</p>

                  <Sections data={article.body} />
                  <div className="article__fb-like  h2  mt4">
                    <FacebookProvider appId="154881868603516">
                      <Like href={`https://www.rendahmag.com/Article/${article.url}`} layout="button_count" width="200" share />
                    </FacebookProvider>
                  </div>
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
