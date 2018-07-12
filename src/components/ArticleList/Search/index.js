/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { convertDate, toTitleCase } from '../../../functions';

export class SearchArticleList extends PureComponent {
  date = date => convertDate(date);

  render() {
    if (!this.props.list.length) {
      return <p className="black  tac  mv3  mv2-sm">Nothing found, try a different search.</p>;
    }
    return (
      <div className="container">
        <div className="row">
          {this.props.list.map(article => (
            <div key={article.title} className="col-md-12  w-100  zoom-in-fade-in-iteration--cont">
              <article className="pv3  searchArticleList__col--search">

                <div className="row">
                  <div className="col-sm-12">
                    <figure className="rel  pb3">
                      <Link to={`/article/${article.url}`} className="shadow2  shadow3-hover  db  over-hidden  searchArticleList__img--cont">
                        <img className="mb3  w-100  zoom-in-fade-in-iteration--item  cp  searchArticleList__img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
                      </Link>
                    </figure>
                  </div>
                  <div className="col-sm-12">
                    <span className="grey  t8">{this.date(article.created)} | </span>
                    <Link to={`/author/${article.author}`} className="no-underline"><span className="grey  t8  cp  link">{toTitleCase(article.author)}</span></Link>
                    <Link to={`/article/${article.url}`} className="no-underline">
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
