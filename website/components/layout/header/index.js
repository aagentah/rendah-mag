import { useEffect } from 'react';
import Link from 'next/link';
// import cx from 'classnames';
import NProgress from 'nprogress';

import { Button, Icon } from 'next-pattern-library';

import Container from '../container';
import SearchBar from '../../search-bar';

import { useUser } from '../../../lib/hooks';
import { useApp } from '../../../context-provider/app';

export default function Header() {
  const [user, { mutate }] = useUser();
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

  const buttonIconSignIn = <Icon icon={['fas', 'sign-in-alt']} />;
  const buttonIconSignOut = <Icon icon={['fas', 'sign-out-alt']} />;

  return (
    <div className="header  bg-almost-white  flex  justify-center  align-center">
      <Container>
        <div className="flex  justify-start  align-center">
          <nav className="nav  col-18  flex  justify-start">
            <ul className="flex  flex-wrap">
              <li className="dib  pr3">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="Home"
                  color="white"
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
              {user ? (
                <>
                  <li className="dib  pr3">
                    <Button
                      /* Options */
                      type="secondary"
                      size="medium"
                      text="Profile"
                      color="white"
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
                      color="white"
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
                      color="white"
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
                      color="white"
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
          <div className="col-12  flex  justify-end">
            <SearchBar />
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
      </Container>
    </div>
  );
}
