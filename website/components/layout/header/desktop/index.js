import Link from 'next/link';

import { Button } from 'next-pattern-library';

import { useUser } from '~/lib/hooks';

export default function HeaderDestop({
  meta,
  navColour,
  navHex,
  navOnWhite,
  handleLogout,
  showBasket,
  buttonIcons,
}) {
  const [user] = useUser();

  return (
    <div
      className={`header  header--desktop  bg-almost-white  justify-center  align-center  dn  df-md  ${
        navOnWhite ? 'nav-on-white' : ''
      }`}
    >
      <div className="flex  align-center  w-100">
        <div className="header__logo">
          <Link href="/">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="1440"
              height="1440"
              viewBox="0 0 1080 1080"
            >
              <g fill={navHex}>
                <path d="M358 12.7c-158.6.8-288.7 1.6-288.9 1.9-.2.2 7 15.6 16.1 34.1l16.6 33.8 94.8.8c52.2.5 95 1 95.2 1.1.1.2-20.3 34.6-45.3 76.6-25.1 42-45.4 76.7-45.3 77.1.2.4 13.4 22.9 29.3 49.8l29 49 177.1.3 177 .3-94.8 153.8C466.7 576 424 645.6 424 646.1s11.6 19.9 25.8 43l25.7 42.2 86.8-.6c47.7-.3 86.7-.4 86.7-.2s-19.2 31.7-42.7 70.1c-23.4 38.5-42.8 70.6-43 71.5-.3.9 7.8 20.6 17.9 43.8l18.3 42.1h56l56-.1 42-71.9c23.1-39.6 42.2-72 42.5-72 .3 0 19.1 32.4 41.9 72l41.3 72h48.9c26.9 0 48.9-.4 48.9-.8 0-.5-40-70.5-89-155.6-48.9-85.1-89-155-89-155.5 0-.4 40.1-70 89-154.7 49-84.6 88.9-154.7 88.8-155.7-.2-1-40.3-74.4-89.3-163.2L798.5 11l-76 .2c-41.8 0-205.8.7-364.5 1.5z" />
                <path d="M69.2 117.5c.4 2 83.2 157.5 83.8 157.5.6-.1 83.3-155.7 83.8-157.7.3-1.1-14.9-1.3-83.8-1.3-74 0-84.1.2-83.8 1.5zM410.4 758.7c.8 1.9 81.8 150 84.6 154.7l1.8 3 52.6-79.3c28.9-43.5 52.6-79.4 52.6-79.7 0-.2-43.2-.4-96.1-.4-90.4 0-96.1.1-95.5 1.7zM335.2 849.1c.6 1.7 48.2 75.8 48.8 75.8.4 0 39.8-73.3 40.8-76 .2-.5-19.4-.9-44.8-.9-32.3 0-45.1.3-44.8 1.1zM741 969c-31.9 53.4-58.4 97.8-58.7 98.6-.4 1.2 14.5 1.4 113.7 1.4 93.7 0 114.1-.2 113.8-1.3-.3-1.5-108.6-193.7-109.8-195-.5-.5-27 42.8-59 96.3z" />
              </g>
            </svg>
          </Link>
        </div>
        <div className="col-12  ph4">
          <nav className="nav  w-100  flex  justify-start">
            <ul className="flex  flex-wrap">
              <li className="nav__item  dib  pr3">
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
                  skeleton={false}
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      scroll: false,
                    },
                  }}
                />
              </li>
              <li className="nav__item  dib  pr3">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="Gallery"
                  color={navColour}
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/gallery',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      scroll: false,
                    },
                  }}
                />
              </li>
              <li className="nav__item  dib  pr3">
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
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/cyphers',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      scroll: false,
                    },
                  }}
                />
              </li>
              <li className="nav__item  dib  pr3">
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
                    routerLinkProps: {
                      scroll: false,
                    },
                  }}
                />
              </li>
              <li className="nav__item  dib  pr3">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="Store"
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
                    href: '/store',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      scroll: false,
                    },
                  }}
                />
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-12  ph4">
          <nav className="nav  w-100  flex  justify-end">
            <ul className="flex  flex-wrap">
              {user ? (
                <>
                  <li className="nav__item  dib  pr3">
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
                      skeleton={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/profile',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          scroll: false,
                        },
                      }}
                    />
                  </li>
                  <li className="nav__item  dib  pr3">
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
                      skeleton={false}
                      onClick={handleLogout}
                      /* Children */
                      withLinkProps={null}
                    />
                  </li>
                </>
              ) : (
                <>
                  <li className="nav__item  dib  pr3">
                    <Button
                      /* Options */
                      type="secondary"
                      size="medium"
                      text="Dominion"
                      color={navColour}
                      fluid={false}
                      icon={buttonIcons.store}
                      iconFloat={null}
                      inverted
                      loading={false}
                      disabled={false}
                      skeleton={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/dominion',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          scroll: false,
                        },
                      }}
                    />
                  </li>
                  <li className="nav__item  dib  pr3">
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
                      skeleton={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/login',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          scroll: false,
                        },
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
