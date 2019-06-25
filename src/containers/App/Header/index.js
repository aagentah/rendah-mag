/* eslint-disable import/no-named-as-default, max-len, react/prefer-stateless-function,
jsx-a11y/no-static-element-interactions, arrow-body-style */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import includes from 'lodash/includes';

import SearchInput from '../../../components/Elements/SearchInput';
import CheckoutButton from '../../../components/Elements/CheckoutButton';
import { Search } from '../../../components/Elements/Svg';
import Logo from '../assets/logo-medium.png';

export class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      navIsActive: false,
      searchIsActive: false,
      isStore: false,
    };
  }

  componentDidMount() {
    this.checkIfStore();
  }

  componentWillReceiveProps() {
    this.checkIfStore();
  }

  mobileNavToggle = () => {
    if (!this.state.navIsActive && !this.state.searchIsActive) {
      this.setState({ navIsActive: true });
    } else {
      this.setState({ navIsActive: false });
    }
    this.setState({ searchIsActive: false });
  };

  mobileSearchToggle = () => {
    if (!this.state.searchIsActive && !this.state.navIsActive) {
      this.setState({ searchIsActive: true });
    } else {
      this.setState({ searchIsActive: false });
    }
    this.setState({ navIsActive: false });
  };

  checkIfStore = () => {
    if (typeof window !== 'undefined') {
      if (
        includes(window.location.pathname, '/store') ||
        includes(window.location.pathname, '/product')
      ) {
        this.setState({ isStore: true });
      } else {
        this.setState({ isStore: false });
      }
    }
  };

  render() {
    const links = [
      {
        to: '/',
        text: 'Home',
      },
      {
        to: '/team',
        text: 'Team',
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
        to: '/category/insights',
        text: 'Insights',
      },
      // {
      //   to: '/mixes',
      //   text: 'Mixes',
      // },
      // {
      //   to: '/store',
      //   text: 'Store',
      // },
      // {
      //   to: '/store/opening-sequence',
      //   text: 'Store range',
      // },
      {
        to: '/watch-tower',
        text: 'Watch Tower',
      },
    ];

    const navMobile = classNames({
      'fix  bg-white  z8  header__mobile__nav': true,
      'is-active': this.state.navIsActive,
    });

    const searchMobile = classNames({
      'fix  bg-white  z8  header__mobile__search': true,
      'is-active': this.state.searchIsActive,
    });

    const hamburger = classNames({
      'abs  cp  z9  header__mobile__nav__hamburger': true,
      'is-active': this.state.navIsActive || this.state.searchIsActive,
    });

    return (
      <React.Fragment>
        {/* Desktop */}
        <header className="fix  w-100  shadow1  z9  bg-white  dn  db-lg  header__desktop">
          <nav className="container-large  center  rel" role="banner">
            <Link className="link  abs  header__desktop__logo" title="rendah" to={'/'}>
              <img className="pt1  mt1" width="38" src={Logo} alt="Logo" role="presentation" />
            </Link>

            <ul className="tac  abs  center  header__desktop__nav__list">
              {links.map((link) => {
                return (
                  <li key={link.text} className="dib">
                    <Link
                      className="t-title  ttu  bold  dark-grey  ph2  f5  link"
                      title={link.to}
                      to={link.to}
                    >
                      {link.text}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {this.state.isStore ? (
              <div className="abs  header__desktop__cart">
                <CheckoutButton />
              </div>
            ) : (
              <div className="abs  w4  header__desktop__search">
                <SearchInput textAlign="inherit" />
              </div>
            )}
          </nav>
        </header>

        {/* Mobile */}
        <header className="fix  w-100  shadow1  z9  bg-white  db  dn-lg  header__mobile">
          <div onClick={this.mobileNavToggle} className={hamburger}>
            <span className="bg-black" />
            <span className="bg-black" />
            <span className="bg-black" />
          </div>

          <Link
            className="link  abs  w3  center  center  header__mobile__logo"
            title="rendah"
            to={'/'}
          >
            <img
              className="pt1  mt1  center"
              width="38"
              src={Logo}
              alt="Logo"
              role="presentation"
            />
          </Link>

          <nav className={navMobile} role="banner">
            <ul className="tac  fix  center  header__mobile__nav__list">
              {links.map((link) => {
                return (
                  <li key={link.text} className="db">
                    <Link
                      onClick={this.mobileNavToggle}
                      className="t-title  ttu  bold  db  dark-grey  pv3  f4  link"
                      title={link.to}
                      to={link.to}
                    >
                      {link.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={searchMobile}>
            <div className="abs  w-80  center  header__mobile__search-input">
              <SearchInput onSearch={this.mobileSearchToggle} />
            </div>
          </div>

          <div onClick={this.mobileSearchToggle} className="abs  cp  header__mobile__search-icon">
            <Search />
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
