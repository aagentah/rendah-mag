/* eslint-disable import/no-named-as-default, max-len, react/prefer-stateless-function */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import SearchInput from '../../../components/SearchInput';

export class Header extends PureComponent {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 380,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: 'ease-in-out',
      swipeToSlide: false,
      prevArrow: <img src="https://res.cloudinary.com/dzz8ji5lj/image/upload/a_180/v1528232128/brand/util/iconmonstr-arrow-48-240.png" alt="<<" />,
      nextArrow: <img src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1528232128/brand/util/iconmonstr-arrow-48-240.png" alt=">>" />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="rel  shadow2  z9">
        <header role="banner">
          <Link className="link" to={'/'}>
            <img className="logo" width="50" src={require('../assets/Rendah-Logo-Small.png')} alt="Logo" role="presentation" />
          </Link>
          <nav className="nav  tal  pt4">
            <ul className="nav__list  ma0  pa0  tac  center  rel">
              <li className="dib">
                <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/'}>Home</Link>
              </li>
              <li className="dib">
                <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/Authors'}>Authors</Link>
              </li>
              <li className="dib">
                <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/GetInvolved'}>Get Involved</Link>
              </li>
              <li data-nav-category="1" className="abs  dn-sm">
                <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/Category/Interviews'}>Interviews</Link>
              </li>
              <li data-nav-category="2" className="abs  dn-sm">
                <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/Category/Insights'}>Insights</Link>
              </li>
              <li data-nav-category="3" className="abs  dn-sm">
                <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/Category/News'}>News</Link>
              </li>
            </ul>
          </nav>
          <div className="header__social--cont  pr0-sm">
            <SearchInput textAlign="inherit" />
            <a className="header__social  ph1  dn-sm" href="https://www.facebook.com/rendahmag/" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-facebook-5.png')} alt="facebook" />
            </a>
            <a className="header__social  ph1  dn-sm" href="https://twitter.com/RendahMag" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-twitter-5.png')} alt="twitter" />
            </a>
            <a className="header__social  ph1  dn-sm" href="https://www.instagram.com/rendahmag/" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-instagram-5.png')} alt="instagram" />
            </a>
            {
              // <a className="header__social  ph1  dn-sm" href="https://www.soundcloud.com/rendahmag/" rel="noopener noreferrer" target="_blank">
              //   <img src={require('../assets/social/iconmonstr-soundcloud-5.png')} alt="soundcloud" />
              // </a>
              // <a className="header__social  ph1  dn-sm" href="https://www.youtube.com/channel/UCFpU3WYYWy5qWSYf306_m3A" rel="noopener noreferrer" target="_blank">
              //   <img src={require('../assets/social/iconmonstr-youtube-5.png')} alt="youtube" />
              // </a>
            }
          </div>
        </header>
        <div className="dn  db-sm  bg-black">
          <div className="w-70  center  white">
            <Slider {...settings}>
              <div>
                <Link className="db  tac  white  link  pv2" to={'/'}>Home</Link>
              </div>
              <div>
                <Link className="db  tac  white  link  pv2" to={'/Authors'}>Authors</Link>
              </div>
              <div>
                <Link className="db  tac  white  link  pv2" to={'/GetInvolved'}>Join Us</Link>
              </div>
              <div>
                <Link className="db  tac  white  link  pv2" to={'/Category/Interviews'}>Interviews</Link>
              </div>
              <div>
                <Link className="db  tac  white  link  pv2" to={'/Category/Insights'}>Insights</Link>
              </div>
              <div>
                <Link className="db  tac  white  link  pv2" to={'/Category/News'}>News</Link>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
