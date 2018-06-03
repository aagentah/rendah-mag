/* eslint-disable react/sort-comp */
/* eslint-disable import/no-named-as-default, max-len */

import React from 'react';
import type { Element } from 'react';
import { Link } from 'react-router-dom';

import SearchInput from '../../../components/SearchInput';

const Header = (): Element<'div'> => (
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
          <li data-nav-category="1" className="abs  dn-md">
            <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/Category/Interviews'}>Interviews</Link>
          </li>
          <li data-nav-category="2" className="abs  dn-md">
            <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/Category/Insights'}>Insights</Link>
          </li>
          <li data-nav-category="3" className="abs  dn-md">
            <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/Category/News'}>News</Link>
          </li>
          <li data-nav-category="4" className="abs  dn-md">
            <Link className="nav__link  title-font  black  dib  ph2  t6  link" to={'/Category/Mixes'}>Mixes</Link>
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
  </div>
);

export default Header;
