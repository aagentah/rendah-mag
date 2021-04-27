import { useEffect } from 'react';
import Link from 'next/link';
import { Button, Icon } from 'next-pattern-library';

import Container from '~/components/layout/container';
import SearchBar from '~/components/search-bar';

import { useUser } from '~/lib/hooks';
import { useApp } from '~/context-provider/app';

export default function Header({ siteConfig, handleLogout }) {
  const [user, { mutate }] = useUser();
  const app = useApp();

  const buttonIconSignIn = <Icon icon={['fas', 'sign-in-alt']} />;
  const buttonIconSignOut = <Icon icon={['fas', 'sign-out-alt']} />;

  return (
    <div className="header  header--desktop  bg-almost-white  flex  justify-center  align-center">
      <Container>
        <div className="flex  justify-start  align-center">
          <nav className="nav  col-18  ls-none">
            <ul className="flex  flex-wrap">
              {siteConfig?.menu?.map?.length &&
                siteConfig.menu.map((iteration, i) => {
                  let path = iteration?.slug?.current;
                  if (path === 'home') path = '';

                  return (
                    <li className="dib  pr3">
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text={iteration?.title}
                        color="black"
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
                          href: `/${path}`,
                          target: null,
                          routerLink: Link,
                          routerLinkProps: null,
                        }}
                      />
                    </li>
                  );
                })}
              {user ? (
                <>
                  <li className="dib  pr3">
                    <Button
                      /* Options */
                      type="secondary"
                      size="medium"
                      text="Profile"
                      color="black"
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
                      color="black"
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
                      color="black"
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
                      color="black"
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
          <div className="col-6">
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
