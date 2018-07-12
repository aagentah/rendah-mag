/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import { convertDate, toTitleCase } from '../../../functions';

export class LatestArticleListLoaded extends PureComponent {
  date = date => convertDate(date);

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 380,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: 'ease-in-out',
      swipeToSlide: false,
      prevArrow: <span>&#8249;</span>,
      nextArrow: <span>&#8250;</span>,
      responsive: [
        {
          breakpoint: (992 - 1),
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: (576 - 1),
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    if (this.props.extra) {
      return (
        <div className="container  latestArticleList--extra">
          <div className="">
            <Slider {...settings}>
              {this.props.list.map(article => (
                <div className="ph3">
                  <div key={article.title} className="w-100  zoom-in-fade-in-iteration--cont">
                    <article className="pv3  latestArticleList__col--latest">

                      <figure className="rel  pb3">
                        <Link to={`/article/${article.url}`} className="shadow2  shadow3-hover  db  over-hidden  latestArticleList__img--cont">
                          <img className="mb3  w-100  zoom-in-fade-in-iteration--item  cp  latestArticleList__img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
                        </Link>
                      </figure>
                      <span className="grey  t8">{this.date(article.created)} | </span>
                      <Link to={`/author/${article.author}`} className="no-underline"><span className="grey  t8  cp  link">{toTitleCase(article.author)}</span></Link>
                      <Link to={`/article/${article.url}`} className="no-underline">
                        <p className="black  t7  pt2  cp  title-font  over-hidden  link  latestArticleList__title">{article.title}</p>
                      </Link>
                      <p className="grey  t8  pv2  over-hidden  latestArticleList__intro">{article.description}</p>

                    </article>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          {this.props.list.map(article => (
            <div key={article.title} className="col-sm-12  col-md-6  w-100  zoom-in-fade-in-iteration--cont">
              <article className="pv3  latestArticleList__col--latest">

                <figure className="rel  pb3">
                  <Link to={`/article/${article.url}`} className="shadow2  shadow3-hover  db  over-hidden  latestArticleList__img--cont">
                    <img className="mb3  w-100  zoom-in-fade-in-iteration--item  cp  latestArticleList__img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
                  </Link>
                </figure>
                <span className="grey  t8">{this.date(article.created)} | </span>
                <Link to={`/author/${article.author}`} className="no-underline"><span className="grey  t8  cp  link">{toTitleCase(article.author)}</span></Link>
                <Link to={`/article/${article.url}`} className="no-underline">
                  <p className="black  t7  pt2  cp  title-font  over-hidden  link  latestArticleList__title">{article.title}</p>
                </Link>
                <p className="grey  t8  pv2  over-hidden  latestArticleList__intro">{article.description}</p>

              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

LatestArticleListLoaded.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  extra: PropTypes.bool,
};

LatestArticleListLoaded.defaultProps = {
  list: [],
  extra: false,
};

export default LatestArticleListLoaded;
