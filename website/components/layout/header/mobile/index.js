import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Image, Button, Icon } from 'next-pattern-library';

import Container from '../../container';
import SearchBar from '../../../search-bar';

import { useUser } from '~/lib/hooks';

export default function HeaderMobile({
  meta,
  navColour,
  navOnWhite,
  handleLogout,
  showBasket,
  buttonIcons,
}) {
  const [user] = useUser();
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <div
      className={`header  header--mobile  ${
        navOpen ? 'collapsed' : ''
      }  bg-almost-white  justify-center  align-center  df  dn-md`}
    >
      <div className="flex  flex-wrap">
        <button className="header__burger" onClick={toggleNav} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={navColour}
          >
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
          </svg>
        </button>
      </div>

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
        {!navOnWhite && (
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

      {showBasket ? (
        <>
          <div className="snipcart-checkout">
            {buttonIcons.shoppingCart}
            <span className="snipcart-items-count" />
          </div>
        </>
      ) : null}

      <nav className="nav  w-100">
        <div className="flex  flex-wrap">
          <div className="col-12  flex  align-center  justify-start  pa4">
            <span className="t-secondary  bg-black  white  ph2  pv1  f4">
              Menu
            </span>
          </div>
          <button
            className="col-12  flex  align-center  justify-end  pa4"
            onClick={toggleNav}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>
        </div>
        <ul className="w-100  pt4">
          <li className="db  pl4  pb3">
            <Link href="/">
              <span
                className="t-primary  black  f3  bb  bw1  bc-black  dib  mb2  pb2"
                onClick={toggleNav}
              >
                Home
              </span>
            </Link>
          </li>
          <li className="db  pl4  pb3">
            <Link href="/cyphers">
              <span
                className="t-primary  black  f3  bb  bw1  bc-black  dib  mb2  pb2"
                onClick={toggleNav}
              >
                Cyphers
              </span>
            </Link>
          </li>
          <li className="db  pl4  pb3">
            <Link href="/team">
              <span
                className="t-primary  black  f3  bb  bw1  bc-black  dib  mb2  pb2"
                onClick={toggleNav}
              >
                Team
              </span>
            </Link>
          </li>
          <li className="db  pl4  pb3">
            <Link href="/guest-mixes">
              <span
                className="t-primary  black  f3  bb  bw1  bc-black  dib  mb2  pb2"
                onClick={toggleNav}
              >
                Mixes
              </span>
            </Link>
          </li>
          <li className="db  pl4  pb3">
            <Link href="/store">
              <span
                className="t-primary  black  f3  bb  bw1  bc-black  dib  mb2  pb2"
                onClick={toggleNav}
              >
                Store
              </span>
            </Link>
          </li>

          {user ? (
            <>
              <li className="db  pl4  pb3">
                <Link href="/profile">
                  <span
                    className="t-primary  black  f3  bb  bw1  bc-black  dib  mb2  pb2"
                    onClick={toggleNav}
                  >
                    Profile
                  </span>
                </Link>
              </li>
              <li className="db  pl4  pb3">
                <span
                  className="t-primary  black  f3  bb  bw1  bc-black  dib  mb2  pb2"
                  onClick={() => {
                    toggleNav();
                    handleLogout();
                  }}
                >
                  Log Out
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="db  pl4  pb3">
                <Link href="/signup">
                  <span
                    className="t-primary  black  f3  bb  bw1  bc-black  dib  mb2  pb2"
                    onClick={toggleNav}
                  >
                    Sign Up
                  </span>
                </Link>
              </li>
              <li className="db  pl4  pb3">
                <Link href="/login">
                  <span
                    className="t-primary  black  f3  bb  bw1  bc-black  dib  mb2  pb2"
                    onClick={toggleNav}
                  >
                    Login
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
