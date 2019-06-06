/* eslint-disable import/no-named-as-default, no-return-assign */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactSwipe from 'react-swipe';

import { convertDate } from '../../../functions';
import AnimatedImage from '../../Elements/AnimatedImage';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding } = this.props;
    console.log(list.length);

    return (
      <div className={`container-medium-md  center  ${padding}`}>
        <ReactSwipe
          swipeOptions={{
            continuous: true,
            auto: 2200,
            speed: 300,
            swiping: true,
          }}
        >
          {list.map(article => (
            <div key={article.title}>
              <article className="rel  ph0  ph3-md">
                <figure>
                  <Link
                    className="db  shadow2"
                    title={article.slug}
                    to={`/article/${article.slug}`}
                  >
                    <AnimatedImage
                      lazy={false}
                      src={article.img}
                      alt={article.title}
                      styles="fade-in-zoom-in  vh-60  mh14  w-100  objp--carousel"
                    />
                  </Link>
                </figure>

                <Link
                  className="abs  top  bottom  left  right  tac  center  ma  h2  mw-80"
                  to={`/article/${article.slug}`}
                >
                  <p className="t-body  dib  link  pa3  bg-black  shadow4  bb  bw1  bc-white">
                    <span className="t-title  white  bold  f5  f4-md  ttu  cp  over-hidden  link">
                      {article.title}
                    </span>
                  </p>
                </Link>
              </article>
            </div>
          ))}
        </ReactSwipe>
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
