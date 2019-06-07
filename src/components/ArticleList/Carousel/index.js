/* eslint-disable import/no-named-as-default, no-return-assign */

import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';
import { Link } from 'react-router-dom';

export class ArticleListGrid extends PureComponent {
  render() {
    const { list, padding } = this.props;
    console.log('list', list);

    return (
      <div className={`w-100  ${padding}`}>
        <div className="FeaturedArticle" key={list.title}>
          <Link to={`/article/${list.slug}`} title={list.title}>
            <div className="content">
              <div className="glitch">
                <ProgressiveImage src={list.img} placeholder={`${list.img}?w=100`}>
                  {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                </ProgressiveImage>
                <ProgressiveImage src={list.img} placeholder={`${list.img}?w=100`}>
                  {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                </ProgressiveImage>
                <ProgressiveImage src={list.img} placeholder={`${list.img}?w=100`}>
                  {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                </ProgressiveImage>
                <ProgressiveImage src={list.img} placeholder={`${list.img}?w=100`}>
                  {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                </ProgressiveImage>
                <ProgressiveImage src={list.img} placeholder={`${list.img}?w=100`}>
                  {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                </ProgressiveImage>
              </div>
              <h2 className="t-special  white  FeaturedArticle__title">{list.title}</h2>
              <p className="t-title  white  dn  db-md  FeaturedArticle__description">{list.description}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

ArticleListGrid.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  padding: PropTypes.string,
};

ArticleListGrid.defaultProps = {
  list: [],
  padding: '',
};

export default ArticleListGrid;
