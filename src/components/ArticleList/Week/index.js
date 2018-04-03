/* eslint-disable import/no-named-as-default,
  react/no-array-index-key,
  jsx-a11y/no-static-element-interactions,
  react/no-array-index-key,
  jsx-a11y/no-noninteractive-element-interactions */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class WeekArticleListLoaded extends PureComponent {
  render() {
    return (
      <div className="container  mt4">
        <div className="row">
          {this.props.list.map((article, i) => (
            <div key={i} className="link  w-100  zoom-in-fade-in-iteration--cont">
              <article className="col-sm-12  col-md-12  pv3  weekArticleList__col--week">

                <figure className="rel  pb3">
                  <Link to={`/Article/${article.title.replace(/\s+/g, '-')}`} className="shadow2  db  over-hidden  weekArticleList__img--cont">
                    <img className="mb3  w-100  zoom-in-fade-in-iteration--item  cp  weekArticleList__img" alt={article.title} src={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${article.img}`} />
                  </Link>
                </figure>
                <div className="abs  weekArticleList__title--cont">
                  <span className="white  bg-black  pv1  pl2  mv2  t8">{article.created} | </span>
                  <Link to={`/Author/${article.author.replace(/\s+/g, '-')}`} className="no-underline"><span className="white  bg-black  pv1  pr2  mv2  t8  cp  link" onClick={() => this.handleClick(article.author, 'author')}>{article.author}</span></Link>
                  <Link to={`/Article/${article.title.replace(/\s+/g, '-')}`} className="no-underline">
                    <p onClick={() => this.handleClick(article.title, 'article')} className="white  bg-black  pv1  ph2  mv2  t7  pt2  cp  title-font  over-hidden  w-90  link  weekArticleList__title">{article.title}</p>
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

WeekArticleListLoaded.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

WeekArticleListLoaded.defaultProps = {
  list: [],
};

export default WeekArticleListLoaded;
