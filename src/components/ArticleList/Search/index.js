/* eslint-disable import/no-named-as-default,
  react/no-array-index-key,
  jsx-a11y/no-static-element-interactions,
  react/no-array-index-key,
  jsx-a11y/no-noninteractive-element-interactions */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { convertDate } from '../../../functions';

export class SearchArticleList extends PureComponent {
  date = date => convertDate(date);

  render() {
    if (!this.props.list.length) {
      return <p className="black  tac  mv3  mv2-sm">Nothing found, try a different search.</p>;
    }
    return (
      <div className="container  mv3  mv2-sm">
        <div className="row">
          {this.props.list.map((article, i) => (
            <div key={i} className="link  w-100  zoom-in-fade-in-iteration--cont">
              <article className="col-sm-12  pv3  searchArticleList__col--search">

                <div className="row">
                  <div className="col-sm-12">
                    <figure className="rel  pb3">
                      <Link to={`/Article/${article.url}`} className="shadow2  db  over-hidden  searchArticleList__img--cont">
                        <img className="mb3  w-100  zoom-in-fade-in-iteration--item  cp  searchArticleList__img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
                      </Link>
                    </figure>
                  </div>
                  <div className="col-sm-12">
                    <span className="grey  t8">{this.date(article.created)} | </span>
                    <Link to={`/Author/${article.author.replace(/\s+/g, '-')}`} className="no-underline"><span className="grey  t8  cp  link">{article.author}</span></Link>
                    <Link to={`/Article/${article.url}`} className="no-underline">
                      <p className="black  t7  pt2  cp  title-font  over-hidden  link  searchArticleList__title">{article.title}</p>
                    </Link>
                    <p className="grey  t8  pv2  over-hidden  searchArticleList__intro">{article.description}</p>
                  </div>
                </div>

              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

SearchArticleList.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

SearchArticleList.defaultProps = {
  list: [],
};

export default SearchArticleList;
