/* eslint-disable import/no-named-as-default, max-len, react/prefer-stateless-function,
jsx-a11y/no-static-element-interactions */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import SearchInput from '../../../components/SearchInput';
import { CaretDown, Menu } from '../../../components/Elements/Svg';

export class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      navExpand: false,
      searchExpand: false,
    };
  }

  navExpandToggle = () => {
    if (this.state.navExpand) {
      this.setState({ navExpand: false });
    } else {
      this.setState({ navExpand: true });
    }
    this.setState({ searchExpand: false });
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
      <div className="rel  z9">
        <header className="header--desktop  dn-lg  db  shadow2" role="banner">

          <Link className="logo--desktop  link" to={'/'}>
            <img width="50" src={require('../assets/Rendah-Logo-Small.png')} alt="Logo" role="presentation" />
          </Link>

          <nav className="nav--desktop  tal  pt4">
            <ul className="ma0  pa0  tac  center  rel">
              <li className="dib">
                <Link className="ttu  khula-bold  dark-grey  dib  ph2  t7  link" to={'/'}>Home</Link>
              </li>
              <li className="dib">
                <Link className="ttu  khula-bold  dark-grey  dib  ph2  t7  link" to={'/authors'}>Authors</Link>
              </li>
              <li className="dib">
                <Link className="ttu  khula-bold  dark-grey  dib  ph2  t7  link" to={'/get-involved'}>Get Involved</Link>
              </li>
              <li className="dib">
                <Link className="ttu  khula-bold  dark-grey  dib  ph2  t7  link" to={'/watch-tower'}>Watch Tower</Link>
              </li>
              <div className="nav__desktop__category">
                <li data-nav-category="1" className="abs">
                  <Link className="ttu  khula-bold  dark-grey  dib  ph2  t7  link" to={'/category/interviews'}>Interviews</Link>
                  <span className="nav__desktop__category__downArrow"><CaretDown /></span>
                </li>
                <li data-nav-category="2" className="abs">
                  <Link className="ttu  khula-bold  dark-grey  dib  ph2  t7  link" to={'/category/insights'}>Insights</Link>
                  <span className="nav__desktop__category__downArrow"><CaretDown /></span>
                </li>
                <li data-nav-category="3" className="abs">
                  <Link className="ttu  khula-bold  dark-grey  dib  ph2  t7  link" to={'/category/news'}>News</Link>
                  <span className="nav__desktop__category__downArrow"><CaretDown /></span>
                </li>
                <li data-nav-category="4" className="abs">
                  <Link className="ttu  khula-bold  dark-grey  dib  ph2  t7  link" to={'/mixes'}>Mixes</Link>
                  <span className="nav__desktop__category__downArrow"><CaretDown /></span>
                </li>
              </div>
            </ul>
          </nav>

          <div className="header--desktop__social  pr0-lg">
            <SearchInput textAlign="inherit" />
            <a className="header--desktop__social__item  pr1  pl2" href="https://www.facebook.com/rendahmag/" rel="noopener noreferrer" target="_blank">
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
          <div className="header__border--mobile" />
          <div className={mobileHeaderWrapper}>
            <Link className="logo--mobile  link" to={'/'}>
              <img width="50" src={require('../assets/Rendah-Logo-Small.png')} alt="Logo" role="presentation" />
            </Link>

            <span onClick={this.navExpandToggle} className={mobileNavMenuTrigger}><Menu /></span>
            <img onClick={this.searchExpandToggle} className="header__search-trigger" width="12" src={require('../assets/search.png')} alt="Logo" role="presentation" />

            <div className="header__search--mobile">
              <SearchInput textAlign="inherit" onSearch={this.searchExpandToggle} />
            </div>

            <nav className={`${mobileNavMenu}  shadow2`}>
              <ul className="ma0  pa0  pt2  tac  center  rel">
                <li className="db">
                  <Link onClick={this.navExpandToggle} className="ttu  khula-bold  dark-grey  db  pv2  t7  link" to={'/'}>Home</Link>
                </li>
                <li className="db">
                  <Link onClick={this.navExpandToggle} className="ttu  khula-bold  dark-grey  db  pv2  t7  link" to={'/authors'}>Authors</Link>
                </li>
                <li className="db">
                  <Link onClick={this.navExpandToggle} className="ttu  khula-bold  dark-grey  db  pv2  t7  link" to={'/get-involved'}>Get Involved</Link>
                </li>
                <li className="db">
                  <Link onClick={this.navExpandToggle} className="ttu  khula-bold  dark-grey  db  pv2  t7  link" to={'/watch-tower'}>Watch Tower</Link>
                </li>
                <li className="db">
                  <Link onClick={this.navExpandToggle} className="ttu  khula-bold  dark-grey  db  pv2  t7  link" to={'/category/interviews'}>Interviews</Link>
                </li>
                <li className="db">
                  <Link onClick={this.navExpandToggle} className="ttu  khula-bold  dark-grey  db  pv2  t7  link" to={'/category/insights'}>Insights</Link>
                </li>
                <li className="db">
                  <Link onClick={this.navExpandToggle} className="ttu  khula-bold  dark-grey  db  pv2  t7  link" to={'/category/news'}>News</Link>
                </li>
                <li className="db">
                  <Link onClick={this.navExpandToggle} className="ttu  khula-bold  dark-grey  db  pv2  t7  link" to={'/mixes'}>News</Link>
                </li>
              </ul>
              <div className="header--mobile__social pt2">
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
