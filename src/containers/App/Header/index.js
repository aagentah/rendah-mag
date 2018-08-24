/* eslint-disable import/no-named-as-default, max-len, react/prefer-stateless-function,
jsx-a11y/no-static-element-interactions, arrow-body-style */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import SearchInput from '../../../components/SearchInput';
import { Menu } from '../../../components/Elements/Svg';

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
    const links = [
      {
        to: '/',
        text: 'Home',
      },
      {
        to: '/authors',
        text: 'Authors',
      },
      {
        to: '/get-involved',
        text: 'Get Involved',
      },
      {
        to: '/watch-tower',
        text: 'Watch Tower',
      },
      {
        to: '/category/news',
        text: 'News',
      },
      {
        to: '/category/interviews',
        text: 'Interviews',
      },
      {
        to: '/category/news',
        text: 'News',
      },
      {
        to: '/category/insights',
        text: 'Insights',
      },
    ];

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
        <header className="header--desktop  dn-lg  db  shadow1" role="banner">

          <Link className="logo--desktop  link" to={'/'}>
            <img width="50" src={require('../assets/Rendah-Logo-Small.png')} alt="Logo" role="presentation" />
          </Link>

          <nav className="nav--desktop">
            <ul className="ma0  pa0  tac">
              {links.map((link) => {
                return (
                  <li className="dib  pt3  mt2">
                    <Link className="t-title  bold  black  ph2  t7  link" to={link.to}>{link.text}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header--desktop__search  pr0-lg">
            <SearchInput textAlign="inherit" />
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
                {links.map((link) => {
                  return (
                    <li className="db">
                      <Link onClick={this.navExpandToggle} className="ttu  t-title-bold  dark-grey  db  pv2  t7  link" to={link.to}>{link.text}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
