import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Image, Button, Icon } from 'next-pattern-library';

import Container from '../../container';
import SearchBar from '../../../search-bar';

import { useUser } from '~/lib/hooks';

export default function HeaderDestop({
  meta,
  navColour,
  navOnWhite,
  handleLogout,
  showBasket,
  buttonIcons,
}) {
  const [user] = useUser();

  return (
    <div className="header  header--desktop  bg-almost-white  justify-center  align-center  dn  df-md">
      <div className="flex  align-center  w-100">
        <div className={`header__logo  ${navOnWhite && 'o-0'}`}>
          {!navOnWhite && (
            <Image
              /* Options */
              src="/images/logo-white.svg"
              placeholder={null}
              alt="This is the alt text."
              figcaption={null}
              height={null}
              width={null}
              customClass={null}
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
          )}
        </div>
        <div className={`header__logo  ${!navOnWhite && 'o-0'}`}>
          {navOnWhite && (
            <Image
              /* Options */
              src="/images/logo-black.svg"
              placeholder={null}
              alt="This is the alt text."
              figcaption={null}
              height={null}
              width={null}
              customClass={null}
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
          )}
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
                  icon={buttonIcons.store}
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
                      <span className={`pr2 ${navColour}`}>Checkout</span>
                      {buttonIcons.shoppingCart}
                      <span className={`snipcart-items-count `} />
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
                      icon={buttonIcons.signOut}
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
                      icon={buttonIcons.signIn}
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
  );
}
