import { useEffect, useState } from 'react';
import Link from 'next/link';
// import cx from 'classnames';
import NProgress from 'nprogress';

import { Button, Icon } from 'next-pattern-library';

import Container from '../container';
import SearchBar from '../../search-bar';

import { useUser } from '../../../lib/hooks';
import { useApp } from '../../../context-provider/app';

export default function Header({ navOnWhite }) {
  const [user, { mutate }] = useUser();
  const [navColour, setNavColour] = useState('black');
  const app = useApp();

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
    console.log('navOnWhite', navOnWhite);
    if (navOnWhite) {
      setNavColour('black');
    } else {
      setNavColour('white');
    }
  }, [navOnWhite]);

  const buttonIconSignIn = <Icon icon={['fas', 'sign-in-alt']} />;
  const buttonIconSignOut = <Icon icon={['fas', 'sign-out-alt']} />;
  const buttonIconStore = <Icon icon={['fas', 'store-alt']} />;

  return (
    <div className="header  bg-almost-white  flex  justify-center  align-center">
      <div className="flex  align-center  w-100">
        <div className="col-12">
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
        <div className="col-12">
          <nav className="nav  w-100  flex  justify-end">
            <ul className="flex  flex-wrap">
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
          {
            // <SearchBar />
          }
        </div>
        {
          // <div className="col-6">
          //   <span className={`loading-indicator  ${isLoadingClass}`}>
          //     <div className="lds-ring">
          //       <div></div>
          //       <div></div>
          //       <div></div>
          //       <div></div>
          //     </div>
          //   </span>
          // </div>
        }
      </div>
    </div>
  );
}
