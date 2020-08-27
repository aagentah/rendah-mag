import { useEffect, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import NProgress from 'nprogress';

import { Image, Button, Icon } from 'next-pattern-library';

import Container from '../container';
import SearchBar from '../../search-bar';

import { useUser } from '../../../lib/hooks';
import { useApp } from '../../../context-provider/app';

export default function Header({ navOnWhite, meta }) {
  const [user, { mutate }] = useUser();
  const [navColour, setNavColour] = useState('black');
  const [navOpen, setNavOpen] = useState(false);
  const app = useApp();

  const showBasket =
    meta.title === 'Store' ||
    meta.title === 'Product' ||
    meta.title === 'Subscription'
      ? true
      : false;

  async function handleLogout() {
    await fetch('/api/logout');
    mutate({ user: null });
  }

  useEffect(() => {
    if (app.isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [app.isLoading]);

  useEffect(() => {
    if (navOnWhite) {
      setNavColour('black');
    } else {
      setNavColour('white');
    }
  }, [navOnWhite]);

  const toggleNav = () => setNavOpen(!navOpen);

  const logoWhite = cx({ 'o-0': navOnWhite });
  const logoBlack = cx({ 'o-0': !navOnWhite });

  const buttonIconSignIn = <Icon icon={['fas', 'sign-in-alt']} />;
  const buttonIconSignOut = <Icon icon={['fas', 'sign-out-alt']} />;
  const buttonIconStore = <Icon icon={['fas', 'store-alt']} />;
  const buttonShoppingCart = <Icon icon={['fas', 'shopping-cart']} />;

  return (
    <>
      <div className="header  header--desktop  bg-almost-white  justify-center  align-center  dn  df-md">
        <div className="flex  align-center  w-100">
          <div className={`header__logo  ${logoWhite}`}>
            <Image
              /* Options */
              src="/images/logo-medium-white.png"
              placeholder="/images/logo-medium-white.png"
              alt="This is the alt text."
              figcaption={null}
              height={null}
              onClick={null}
              /* Children */
              withLinkProps={{
                type: 'next',
                href: '/',
                target: null,
                routerLink: Link,
                routerLinkProps: null,
              }}
            />
          </div>
          <div className={`header__logo   ${logoBlack}`}>
            <Image
              /* Options */
              src="/images/logo-medium-black.png"
              placeholder="/images/logo-medium-black.png"
              alt="This is the alt text."
              figcaption={null}
              height={null}
              onClick={null}
              /* Children */
              withLinkProps={{
                type: 'next',
                href: '/',
                target: null,
                routerLink: Link,
                routerLinkProps: null,
              }}
            />
          </div>

          <div className="col-12  ph4">
            <nav className="nav  w-100  flex  justify-start">
              <ul className="flex  flex-wrap">
                <li className="dib  pr3">
                  <Button
                    /* Options */
                    type="secondary"
                    size="medium"
                    text="Home"
                    color={navColour}
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null,
                    }}
                  />
                </li>
                <li className="dib  pr3">
                  <Button
                    /* Options */
                    type="secondary"
                    size="medium"
                    text="Cyphers"
                    color={navColour}
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/cyphers',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null,
                    }}
                  />
                </li>
                <li className="dib  pr3">
                  <Button
                    /* Options */
                    type="secondary"
                    size="medium"
                    text="Team"
                    color={navColour}
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/team',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null,
                    }}
                  />
                </li>
                <li className="dib  pr3">
                  <Button
                    /* Options */
                    type="secondary"
                    size="medium"
                    text="Mixes"
                    color={navColour}
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/guest-mixes',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null,
                    }}
                  />
                </li>
                <li className="dib  pr3">
                  <Button
                    /* Options */
                    type="secondary"
                    size="medium"
                    text="Store"
                    color={navColour}
                    fluid={false}
                    icon={buttonIconStore}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/store',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null,
                    }}
                  />
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-12  ph4">
            <nav className="nav  w-100  flex  justify-end">
              <ul className="flex  flex-wrap">
                {showBasket ? (
                  <>
                    <li className="dib  pr3  mr1">
                      <div className="flex  snipcart-checkout">
                        <span className="pr2">Checkout</span>
                        {buttonShoppingCart}
                        <span className="snipcart-items-count" />
                      </div>
                    </li>
                  </>
                ) : null}
                {user ? (
                  <>
                    <li className="dib  pr3">
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text="Profile"
                        color={navColour}
                        fluid={false}
                        icon={null}
                        iconFloat={null}
                        inverted
                        loading={false}
                        disabled={false}
                        onClick={null}
                        /* Children */
                        withLinkProps={{
                          type: 'next',
                          href: '/profile',
                          target: null,
                          routerLink: Link,
                          routerLinkProps: null,
                        }}
                      />
                    </li>
                    <li className="dib  pr3">
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text="Log Out"
                        color={navColour}
                        fluid={false}
                        icon={buttonIconSignOut}
                        iconFloat={null}
                        inverted
                        loading={false}
                        disabled={false}
                        onClick={handleLogout}
                        /* Children */
                        withLinkProps={null}
                      />
                    </li>
                  </>
                ) : (
                  <>
                    <li className="dib  pr3">
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text="Sign Up"
                        color={navColour}
                        fluid={false}
                        icon={null}
                        iconFloat={null}
                        inverted
                        loading={false}
                        disabled={false}
                        onClick={null}
                        /* Children */
                        withLinkProps={{
                          type: 'next',
                          href: '/signup',
                          target: null,
                          routerLink: Link,
                          routerLinkProps: null,
                        }}
                      />
                    </li>
                    <li className="dib  pr3">
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text="Login"
                        color={navColour}
                        fluid={false}
                        icon={buttonIconSignIn}
                        iconFloat={null}
                        inverted
                        loading={false}
                        disabled={false}
                        onClick={null}
                        /* Children */
                        withLinkProps={{
                          type: 'next',
                          href: '/login',
                          target: null,
                          routerLink: Link,
                          routerLinkProps: null,
                        }}
                      />
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div
        className={`header  header--mobile  ${
          navOpen ? 'collapsed' : ''
        }  bg-almost-white  justify-center  align-center  df  dn-md`}
      >
        <div className="flex  flex-wrap">
          <div className="header__burger" onClick={toggleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={navColour}
            >
              <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
            </svg>
          </div>
        </div>

        <div className={`header__logo  ${logoWhite}`}>
          <Image
            /* Options */
            src="/images/logo-medium-white.png"
            placeholder="/images/logo-medium-white.png"
            alt="This is the alt text."
            figcaption={null}
            height={null}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'next',
              href: '/',
              target: null,
              routerLink: Link,
              routerLinkProps: null,
            }}
          />
        </div>
        <div className={`header__logo   ${logoBlack}`}>
          <Image
            /* Options */
            src="/images/logo-medium-black.png"
            placeholder="/images/logo-medium-black.png"
            alt="This is the alt text."
            figcaption={null}
            height={null}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'next',
              href: '/',
              target: null,
              routerLink: Link,
              routerLinkProps: null,
            }}
          />
        </div>

        {showBasket ? (
          <>
            <div className="snipcart-checkout">
              {buttonShoppingCart}
              <span className="snipcart-items-count" />
            </div>
          </>
        ) : null}

        <nav className="nav  w-100  flex  justify-end">
          <div className="flex  flex-wrap">
            <div className="absolute  top  right  mt3  mr3" onClick={toggleNav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            </div>
          </div>
          <ul className="w-100  pt4">
            <li className="db  pl4  pb3">
              <Button
                /* Options */
                type="secondary"
                size="large"
                text="Home"
                color="white"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted
                loading={false}
                disabled={false}
                onClick={toggleNav}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: null,
                }}
              />
            </li>
            <li className="db  pl4  pb3">
              <Button
                /* Options */
                type="secondary"
                size="large"
                text="Cyphers"
                color="white"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted
                loading={false}
                disabled={false}
                onClick={toggleNav}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/cyphers',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: null,
                }}
              />
            </li>
            <li className="db  pl4  pb3">
              <Button
                /* Options */
                type="secondary"
                size="large"
                text="Team"
                color="white"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted
                loading={false}
                disabled={false}
                onClick={toggleNav}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/team',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: null,
                }}
              />
            </li>
            <li className="db  pl4  pb3">
              <Button
                /* Options */
                type="secondary"
                size="large"
                text="Mixes"
                color="white"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted
                loading={false}
                disabled={false}
                onClick={toggleNav}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/guest-mixes',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: null,
                }}
              />
            </li>
            <li className="db  pl4  pb3">
              <Button
                /* Options */
                type="secondary"
                size="large"
                text="Store"
                color="white"
                fluid={false}
                icon={buttonIconStore}
                iconFloat={null}
                inverted
                loading={false}
                disabled={false}
                onClick={toggleNav}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/store',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: null,
                }}
              />
            </li>

            {user ? (
              <>
                <li className="db  pl4  pb3">
                  <Button
                    /* Options */
                    type="secondary"
                    size="large"
                    text="Profile"
                    color="white"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={toggleNav}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/profile',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null,
                    }}
                  />
                </li>
                <li className="db  pl4  pb3">
                  <Button
                    /* Options */
                    type="secondary"
                    size="large"
                    text="Log Out"
                    color="white"
                    fluid={false}
                    icon={buttonIconSignOut}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={() => {
                      toggleNav();
                      handleLogout();
                    }}
                    /* Children */
                    withLinkProps={null}
                  />
                </li>
              </>
            ) : (
              <>
                <li className="db  pl4  pb3">
                  <Button
                    /* Options */
                    type="secondary"
                    size="large"
                    text="Sign Up"
                    color="white"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={toggleNav}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/signup',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null,
                    }}
                  />
                </li>
                <li className="db  pl4  pb3">
                  <Button
                    /* Options */
                    type="secondary"
                    size="large"
                    text="Login"
                    color="white"
                    fluid={false}
                    icon={buttonIconSignIn}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={toggleNav}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/login',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null,
                    }}
                  />
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
