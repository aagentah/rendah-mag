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
      variableWidth: true,
      prevArrow: <span>&#8249;</span>,
      nextArrow: <span>&#8250;</span>,
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
        <header className="header__desktop" role="banner">

          <Link className="link" to={'/'}>
            <img className="logo" width="50" src={require('../assets/Rendah-Logo-Small.png')} alt="Logo" role="presentation" />
          </Link>

          <nav className="nav__desktop  tal  pt4">
            <ul className="ma0  pa0  tac  center  rel">
              <li className="dib">
                <Link className="title-font  black  dib  ph2  t6  link" to={'/'}>Home</Link>
              </li>
              <li className="dib">
                <Link className="title-font  black  dib  ph2  t6  link" to={'/Authors'}>Authors</Link>
              </li>
              <li className="dib">
                <Link className="title-font  black  dib  ph2  t6  link" to={'/Get-Involved'}>Get Involved</Link>
              </li>
              <li className="dib">
                <Link className="title-font  black  dib  ph2  t6  link" to={'/Watch-Tower'}>Watch Tower</Link>
              </li>
              <div className="nav__desktop__category">
                <li data-nav-category="1" className="abs  dn-lg">
                  <Link className="title-font  black  dib  ph2  t6  link" to={'/Category/Interviews'}>Interviews</Link>
                  <span className="nav__desktop__category__downArrow">&#9660;</span>
                </li>
                <li data-nav-category="2" className="abs  dn-lg">
                  <Link className="title-font  black  dib  ph2  t6  link" to={'/Category/Insights'}>Insights</Link>
                  <span className="nav__desktop__category__downArrow">&#9660;</span>
                </li>
                <li data-nav-category="3" className="abs  dn-lg">
                  <Link className="title-font  black  dib  ph2  t6  link" to={'/Category/News'}>News</Link>
                  <span className="nav__desktop__category__downArrow">&#9660;</span>
                </li>
              </div>
            </ul>
          </nav>

          <div className="header--desktop__social  pr0-lg">
            <SearchInput textAlign="inherit" />
            <a className="header--desktop__social__item  ph1  dn-sm" href="https://www.facebook.com/rendahmag/" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-facebook-5.png')} alt="facebook" />
            </a>
            <a className="header--desktop__social__item  ph1  dn-sm" href="https://twitter.com/RendahMag" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-twitter-5.png')} alt="twitter" />
            </a>
            <a className="header--desktop__social__item  ph1  dn-sm" href="https://www.instagram.com/rendahmag/" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-instagram-5.png')} alt="instagram" />
            </a>
            <a className="header--desktop__social__item  ph1  dn-sm" href="https://www.soundcloud.com/rendahmag/" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-soundcloud-5.png')} alt="soundcloud" />
            </a>
            {
              // <a className="header--desktop__social__item  ph1  dn-md" href="https://www.youtube.com/channel/UCFpU3WYYWy5qWSYf306_m3A" rel="noopener noreferrer" target="_blank">
              //   <img src={require('../assets/social/iconmonstr-youtube-5.png')} alt="youtube" />
              // </a>
            }
          </div>
        </header>

        <header className="header__mobile" role="banner">
          <div className="dn  db-lg  bg-black">
            <div className="w-70  center  white">
              <Slider {...settings}>
                <div style={{ width: 100 }}>
                  <Link className="db  tac  white  link  pv2" to={'/'}>Home</Link>
                </div>
                <div style={{ width: 100 }}>
                  <Link className="db  tac  white  link  pv2" to={'/Authors'}>Authors</Link>
                </div>
                <div style={{ width: 110 }}>
                  <Link className="db  tac  white  link  pv2" to={'/Get-Involved'}>Join Us</Link>
                </div>
                <div style={{ width: 130 }}>
                  <Link className="db  tac  white  link  pv2" to={'/Watch-Tower'}>Watch&nbsp;Tower</Link>
                </div>
                <div style={{ width: 100 }}>
                  <Link className="db  tac  white  link  pv2" to={'/Category/Interviews'}>Interviews</Link>
                </div>
                <div style={{ width: 100 }}>
                  <Link className="db  tac  white  link  pv2" to={'/Category/Insights'}>Insights</Link>
                </div>
                <div style={{ width: 100 }}>
                  <Link className="db  tac  white  link  pv2" to={'/Category/News'}>News</Link>
                </div>
              </Slider>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
