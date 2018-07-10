/* eslint-disable import/no-named-as-default, max-len, react/prefer-stateless-function */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import SearchInput from '../../../components/SearchInput';

export class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      navExpand: false,
      searchExpand: false,
    };
  }

  navExpandToggle = (hide) => {
    console.log(hide);
    if (this.state.navExpand) {
      this.setState({ navExpand: false });
    } else {
      this.setState({ navExpand: true });
    }
  }

  searchExpandToggle = () => {
    if (this.state.searchExpand) {
      this.setState({ searchExpand: false });
    } else {
      this.setState({ searchExpand: true });
    }
    this.setState({ navExpand: false });
  }

  render() {
    const mobileHeaderWrapper = classNames({
      'header__float-wrapper': true,
      'header__float-wrapper--searchExpand': this.state.searchExpand,
    });

    const mobileNavMenu = classNames({
      'nav--mobile': true,
      'nav--mobile--expanded': this.state.navExpand,
    });

    const mobileNavMenuTrigger = classNames({
      'header__menu-trigger': true,
      'header__menu-trigger--rotated': this.state.navExpand,
    });

    return (
      <div className="rel  shadow2  z9">
        <header className="header--desktop  dn-lg  db" role="banner">

          <Link className="logo--desktop  link" to={'/'}>
            <img width="50" src={require('../assets/Rendah-Logo-Small.png')} alt="Logo" role="presentation" />
          </Link>

          <nav className="nav--desktop  tal  pt4">
            <ul className="ma0  pa0  tac  center  rel">
              <li className="dib">
                <Link className="title-font  black  dib  ph2  t6  link" to={'/'}>Home</Link>
              </li>
              <li className="dib">
                <Link className="title-font  black  dib  ph2  t6  link" to={'/authors'}>Authors</Link>
              </li>
              <li className="dib">
                <Link className="title-font  black  dib  ph2  t6  link" to={'/get-involved'}>Get Involved</Link>
              </li>
              <li className="dib">
                <Link className="title-font  black  dib  ph2  t6  link" to={'/watch-tower'}>Watch Tower</Link>
              </li>
              <div className="nav__desktop__category">
                <li data-nav-category="1" className="abs">
                  <Link className="title-font  black  dib  ph2  t6  link" to={'/category/interviews'}>Interviews</Link>
                  <span className="nav__desktop__category__downArrow">&#9660;</span>
                </li>
                <li data-nav-category="2" className="abs">
                  <Link className="title-font  black  dib  ph2  t6  link" to={'/category/insights'}>Insights</Link>
                  <span className="nav__desktop__category__downArrow">&#9660;</span>
                </li>
                <li data-nav-category="3" className="abs">
                  <Link className="title-font  black  dib  ph2  t6  link" to={'/category/news'}>News</Link>
                  <span className="nav__desktop__category__downArrow">&#9660;</span>
                </li>
              </div>
            </ul>
          </nav>

          <div className="header--desktop__social  pr0-lg">
            <SearchInput textAlign="inherit" />
            <a className="header--desktop__social__item  ph1" href="https://www.facebook.com/rendahmag/" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-facebook-5.png')} alt="facebook" />
            </a>
            <a className="header--desktop__social__item  ph1" href="https://twitter.com/RendahMag" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-twitter-5.png')} alt="twitter" />
            </a>
            <a className="header--desktop__social__item  ph1" href="https://www.instagram.com/rendahmag/" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-instagram-5.png')} alt="instagram" />
            </a>
            <a className="header--desktop__social__item  ph1" href="https://www.soundcloud.com/rendahmag/" rel="noopener noreferrer" target="_blank">
              <img src={require('../assets/social/iconmonstr-soundcloud-5.png')} alt="soundcloud" />
            </a>
          </div>
        </header>
        <header className="header--mobile  db-lg  dn" role="banner">
          <div className={mobileHeaderWrapper}>
            <Link className="logo--mobile  link" to={'/'}>
              <img width="50" src={require('../assets/Rendah-Logo-Small.png')} alt="Logo" role="presentation" />
            </Link>

            <img onClick={this.navExpandToggle} className={mobileNavMenuTrigger} width="12" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1531175182/brand/util/iconmonstr-menu-1-240_1.png" alt="Logo" role="presentation" />

            <img onClick={this.searchExpandToggle} className="header__search-trigger" width="12" src={require('../assets/search.png')} alt="Logo" role="presentation" />

            <div className="header__search--mobile">
              <SearchInput textAlign="inherit" />
            </div>

            <nav className={`${mobileNavMenu}  shadow2`}>
              <ul className="ma0  pa0  tac  center  rel">
                <li className="db">
                  <Link onClick={() => { this.navExpandToggle(true); }} className="title-font  black  db  pv2  t6  link" to={'/'}>Home</Link>
                </li>
                <li className="db">
                  <Link onClick={() => { this.navExpandToggle(true); }} className="title-font  black  db  pv2  t6  link" to={'/authors'}>Authors</Link>
                </li>
                <li className="db">
                  <Link onClick={() => { this.navExpandToggle(true); }} className="title-font  black  db  pv2  t6  link" to={'/get-involved'}>Get Involved</Link>
                </li>
                <li className="db">
                  <Link onClick={() => { this.navExpandToggle(true); }} className="title-font  black  db  pv2  t6  link" to={'/watch-tower'}>Watch Tower</Link>
                </li>
                <li className="db">
                  <Link onClick={() => { this.navExpandToggle(true); }} className="title-font  black  db  pv2  t6  link" to={'/category/interviews'}>Interviews</Link>
                </li>
                <li className="db">
                  <Link onClick={() => { this.navExpandToggle(true); }} className="title-font  black  db  pv2  t6  link" to={'/category/insights'}>Insights</Link>
                </li>
                <li className="db">
                  <Link onClick={() => { this.navExpandToggle(true); }} className="title-font  black  db  pv2  t6  link" to={'/category/news'}>News</Link>
                </li>
              </ul>
              <div className="header--mobile__social pt3">
                <a className="header--mobile__social__item  ph1" href="https://www.facebook.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                  <img src={require('../assets/social/iconmonstr-facebook-5.png')} alt="facebook" />
                </a>
                <a className="header--mobile__social__item  ph1" href="https://twitter.com/RendahMag" rel="noopener noreferrer" target="_blank">
                  <img src={require('../assets/social/iconmonstr-twitter-5.png')} alt="twitter" />
                </a>
                <a className="header--mobile__social__item  ph1" href="https://www.instagram.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                  <img src={require('../assets/social/iconmonstr-instagram-5.png')} alt="instagram" />
                </a>
                <a className="header--mobile__social__item  ph1" href="https://www.soundcloud.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                  <img src={require('../assets/social/iconmonstr-soundcloud-5.png')} alt="soundcloud" />
                </a>
              </div>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
