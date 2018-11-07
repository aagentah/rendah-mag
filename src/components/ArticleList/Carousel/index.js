/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';

import { convertDate } from '../../../functions';
import AnimatedImage from '../../Elements/AnimatedImage';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding } = this.props;

    return (
      <div className={`w-100  center  ${padding}`}>
        <Carousel
          autoplay
          autoplayInterval={2500}
          speed={320}
          dragging={false}
          easing="easeSinInOut"
          wrapAround
          withoutControls
        >
          {list.map(article => (
            <div key={article.title}>
              <article>
                <figure>
                  <Link className="db  shadow2" title={article.slug} to={`/article/${article.slug}`}>
                    <AnimatedImage
                      lazy={false}
                      src={article.img}
                      alt={article.title}
                      styles="vh-50  mh14  w-100"
                    />
                  </Link>
                </figure>
              </article>
            </div>
          ))}
        </Carousel>
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
