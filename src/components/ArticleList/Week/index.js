/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { convertDate, toTitleCase } from '../../../functions';

export class WeekArticleListLoaded extends PureComponent {
  date = date => convertDate(date);

  render() {
    return (
      <div className="container  mt3  mt2-sm">
        <div className="row">
          {this.props.list.map(article => (
            <div key={article.title} className="col-sm-12  w-100  zoom-in-fade-in-iteration--cont">
              <article className="pv3  weekArticleList__col--week">

                <figure className="rel  pb3">
                  <Link to={`/article/${article.url}`} className="shadow2  shadow3-hover  db  over-hidden  weekArticleList__img--cont">
                    <img className="mb3  w-100  zoom-in-fade-in-iteration--item  cp  weekArticleList__img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
                  </Link>
                </figure>
                <span className="grey  t8">{this.date(article.created)} | </span>
                <Link to={`/author/${article.author}`} className="no-underline"><span className="grey  t8  cp  link">{toTitleCase(article.author)}</span></Link>
                <Link to={`/article/${article.url}`} className="no-underline">
                  <p className="black  t7  pt2  cp  t-title  over-hidden  link  weekArticleList__title">{article.title}</p>
                </Link>
                <p className="grey  t8  pv2  over-hidden  weekArticleList__intro">{article.description}</p>

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
