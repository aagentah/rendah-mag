/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { convertDate, toTitleCase } from '../../../functions';
import AnimatedImage from '../../Elements/AnimatedImage';

export class WeekArticleListLoaded extends PureComponent {
  date = date => convertDate(date);

  render() {
    return (
      <div className="container-medium">
        <div className="flex  flex-wrap">
          {this.props.list.map(article => (
            <div key={article.title} className="col-24  col-12-sm  ph3">
              <article>
                <figure>
                  <Link className="db  shadow2" to={`/article/${article.url}`}>
                    <AnimatedImage
                      lazy
                      src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`}
                      alt={article.title}
                      styles="fade-in-zoom-in  h7  h11-sm  w-100"
                    />
                  </Link>
                </figure>

                <div className="pv2  mt1">
                  <span className="t-body  grey  f6">{this.date(article.created)} | </span>
                  <Link to={`/author/${article.author}`} className="link"><span className="t-body  grey  f6  cp  link">{toTitleCase(article.author)}</span></Link>
                </div>

                <Link to={`/article/${article.url}`} className="t-body  link  db  pb2">
                  <p className="t-title  black  f5  bold  cp  over-hidden  link  weekArticleList__title">{article.title}</p>
                </Link>
                <p className="t-body  grey  f6  over-hidden  card__line-clamp-3">{article.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

WeekArticleListLoaded.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

WeekArticleListLoaded.defaultProps = {
  list: [],
};

export default WeekArticleListLoaded;
