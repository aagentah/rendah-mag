/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import trim from 'lodash/trim';

import { convertDate, toUrlCase } from '../../../functions';
import AnimatedImage from '../../Elements/AnimatedImage';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding, type } = this.props;
    let containerClass;
    let imageHeight;

    if (type === 'featured') {
      containerClass = 'col-24  col-12-sm';
      imageHeight = 'h7  h11-sm';
    }
    if (type === 'grid') {
      containerClass = 'col-24  col-12-sm  col-6-md';
      imageHeight = 'h7  h7-sm';
    }

    console.log('list', list);

    return (
      <div className={`container-medium  center  ${padding}`}>
        <div className="flex  flex-wrap">
          {list.map(article => (
            <div key={article.title} className={`${containerClass}  pa3`}>
              <article>
                <figure>
                  <Link className="db  shadow2" title={article.slug} to={`/article/${article.slug}`}>
                    <AnimatedImage
                      lazy
                      src={article.img}
                      alt={article.title}
                      styles={`fade-in-zoom-in  ${imageHeight}  w-100`}
                    />
                  </Link>
                </figure>

                <div className="pv2  mt2">
                  <span className="t-body  grey  f6">{this.date(article.created)} | </span>
                  <Link to={`/team/${toUrlCase(trim(article.teamMember))}`} className="link"><span className="t-body  grey  f6  cp  link">{article.teamMember}</span></Link>
                </div>

                <div>
                  <Link to={`/article/${article.slug}`} className="t-body  db  link  pb2">
                    <p className="t-title  lh-copy  black  f5  cp  over-hidden  link  grid-card__title">{article.title}</p>
                  </Link>
                  <p className="t-body  lh-copy  grey  f6  over-hidden  mt1  grid-card__desc">{article.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ArticleListGrid.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.string,
  padding: PropTypes.string,
};

ArticleListGrid.defaultProps = {
  list: [],
  type: '',
  padding: '',
};

export default ArticleListGrid;