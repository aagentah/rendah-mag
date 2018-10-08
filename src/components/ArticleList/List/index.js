/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { convertDate } from '../../../functions';
import AnimatedImage from '../../Elements/AnimatedImage';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding } = this.props;

    return (
      <div className={`container-medium  center  ${padding}`}>
        <div className="flex  flex-wrap">
          {list.map(article => (
            <div key={article.title} className="col-24  col-12-sm  col-24-lg  pt2  pb3  ph0  ph3-sm  ph0-lg">
              <article className="flex  flex-wrap  shadow2">
                <figure className="col-7">
                  <Link className="db" title={article.slug} to={`/article/${article.slug}`}>
                    <AnimatedImage
                      lazy
                      src={article.img}
                      alt={article.title}
                      styles="fade-in-zoom-in  h2  w-100"
                    />
                  </Link>
                </figure>

                <div className="col-17  ph3">
                  <Link title={article.slug} to={`/article/${article.slug}`} className="t-body  db  link  pt2">
                    <p className="t-title  black  f6  cp  over-hidden  link  list-card__title">{article.title}</p>
                  </Link>
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
  padding: PropTypes.string,
};

ArticleListGrid.defaultProps = {
  list: [],
  padding: '',
};

export default ArticleListGrid;
