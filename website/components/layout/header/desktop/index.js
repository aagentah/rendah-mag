import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import { FaCog, FaBook } from 'react-icons/fa';

import Button from '~/components/elements/button';
import SearchBar from '~/components/search-bar';
import { useUser } from '~/lib/hooks';

const IconSearch = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconSearch)
);

const Modal = dynamic(() => import('~/components/modal'));

const ProfileEdit = dynamic(() => import('~/components/profile/edit'));
const ProfileBilling = dynamic(() => import('~/components/profile/billing'));
const ProfilePrints = dynamic(() => import('~/components/profile/prints'));

export default function HeaderDesktop({
  meta,
  navColour,
  navHex,
  navOnWhite,
  handleLogout,
  buttonIcons,
}) {
  const [user] = useUser();
  const [searchActive, setSearchActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalPrintsActive, setModalPrintsActive] = useState(false);

  const searchBarRef = useRef(null);

  const focus = () => {
    searchBarRef.current.focusInput();
  };

  const toggleSearchActive = () => {
    setSearchActive(!searchActive);
    focus();
  };

  const dominion = () => {
    return (
      <>
        {/*
        <li className="inline-flex items-center">
          <Button
            type="secondary"
            size="medium"
            text="Prints"
            color={navColour}
            fluid={false}
            icon={<FaBook />}
            iconFloat={null}
            inverted
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={() => setModalPrintsActive(true)}
            withLinkProps={null}
          />
        </li>
        <li className="inline-flex items-center">
          <Button
            type="secondary"
            size="medium"
            text="Settings"
            color={navColour}
            fluid={false}
            icon={<FaCog />}
            iconFloat={null}
            inverted
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={() => setModalActive(true)}
            withLinkProps={null}
          />
        </li>
        */}
        <li className="inline-flex items-center">
          <Button
            type="secondary"
            size="medium"
            text="Logout"
            color="neutral-300"
            fluid={false}
            icon={buttonIcons.signOut}
            iconFloat={null}
            inverted
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={handleLogout}
            withLinkProps={null}
          />
        </li>

        <Modal size="large" active={modalActive} closeIcon={setModalActive}>
          <ProfileEdit />
          <ProfileBilling />
        </Modal>

        <Modal
          size="large"
          active={modalPrintsActive}
          closeIcon={setModalPrintsActive}
        >
          <ProfilePrints />
        </Modal>
      </>
    );
  };

  return (
    <div
      className={`container hidden md:flex justify-center items-center text-neutral-200 h-24`}
    >
      <div className="flex items-center w-full">
        <Link href="/" legacyBehavior>
          <a className="size-12 mr-4 flex items-center">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="1440"
              height="1440"
              viewBox="0 0 1080 1080"
              className="size-12"
            >
              <g className="fill-neutral-200">
                <path d="M358 12.7c-158.6.8-288.7 1.6-288.9 1.9-.2.2 7 15.6 16.1 34.1l16.6 33.8 94.8.8c52.2.5 95 1 95.2 1.1.1.2-20.3 34.6-45.3 76.6-25.1 42-45.4 76.7-45.3 77.1.2.4 13.4 22.9 29.3 49.8l29 49 177.1.3 177 .3-94.8 153.8C466.7 576 424 645.6 424 646.1s11.6 19.9 25.8 43l25.7 42.2 86.8-.6c47.7-.3 86.7-.4 86.7-.2s-19.2 31.7-42.7 70.1c-23.4 38.5-42.8 70.6-43 71.5-.3.9 7.8 20.6 17.9 43.8l18.3 42.1h56l56-.1 42-71.9c23.1-39.6 42.2-72 42.5-72 .3 0 19.1 32.4 41.9 72l41.3 72h48.9c26.9 0 48.9-.4 48.9-.8 0-.5-40-70.5-89-155.6-48.9-85.1-89-155-89-155.5 0-.4 40.1-70 89-154.7 49-84.6 88.9-154.7 88.8-155.7-.2-1-40.3-74.4-89.3-163.2L798.5 11l-76 .2c-41.8 0-205.8.7-364.5 1.5z" />
                <path d="M69.2 117.5c.4 2 83.2 157.5 83.8 157.5.6-.1 83.3-155.7 83.8-157.7.3-1.1-14.9-1.3-83.8-1.3-74 0-84.1.2-83.8 1.5zM410.4 758.7c.8 1.9 81.8 150 84.6 154.7l1.8 3 52.6-79.3c28.9-43.5 52.6-79.4 52.6-79.7 0-.2-43.2-.4-96.1-.4-90.4 0-96.1.1-95.5 1.7zM335.2 849.1c.6 1.7 48.2 75.8 48.8 75.8.4 0 39.8-73.3 40.8-76 .2-.5-19.4-.9-44.8-.9-32.3 0-45.1.3-44.8 1.1zM741 969c-31.9 53.4-58.4 97.8-58.7 98.6-.4 1.2 14.5 1.4 113.7 1.4 93.7 0 114.1-.2 113.8-1.3-.3-1.5-108.6-193.7-109.8-195-.5-.5-27 42.8-59 96.3z" />
              </g>
            </svg>
          </a>
        </Link>

        <div className="w-full">
          <nav className="w-full flex justify-end">
            <ul className="flex flex-wrap items-center gap-x-4">
              {user && meta.title === 'Profile' ? (
                dominion()
              ) : (
                <>
                  {/* <li
                    className={`inline-flex items-center ${
                      searchActive ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                  >
                    <div
                      className="cursor-pointer mr-3"
                      onClick={toggleSearchActive}
                    >
                      <IconSearch
                        color={navOnWhite ? 'black' : 'white'}
                        size={16}
                      />
                    </div>
                    <SearchBar ref={searchBarRef} />
                  </li> */}
                  <li
                    className={`inline-flex items-center ${
                      navOnWhite ? 'text-black' : 'text-neutral-200'
                    }`}
                  />
                  <li className="inline-flex items-center">
                    <Button
                      type="secondary"
                      size="medium"
                      text="Home"
                      color="neutral-300"
                      fluid={false}
                      icon={null}
                      iconFloat={null}
                      inverted
                      loading={false}
                      disabled={false}
                      skeleton={false}
                      onClick={null}
                      withLinkProps={{
                        type: 'next',
                        href: '/',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: { scroll: false },
                      }}
                    />
                  </li>
                  {/*
                  <li className="inline-flex items-center">
                    <Button
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
                      withLinkProps={{
                        type: 'next',
                        href: '/cyphers',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: { scroll: false },
                      }}
                    />
                  </li>
                  */}
                  {/* <li className="inline-flex items-center">
                    <Button
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
                      withLinkProps={{
                        type: 'next',
                        href: '/gallery',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: { scroll: false },
                      }}
                    />
                  </li> */}
                  {/*
                  <li className="inline-flex items-center">
                    <Button
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
                      withLinkProps={{
                        type: 'next',
                        href: '/team',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: { scroll: false },
                      }}
                    />
                  </li>
                  */}
                  <li className="inline-flex items-center">
                    <Button
                      type="secondary"
                      size="medium"
                      text="Store"
                      color="neutral-300"
                      fluid={false}
                      icon={null}
                      iconFloat={null}
                      inverted
                      loading={false}
                      disabled={false}
                      onClick={null}
                      withLinkProps={{
                        type: 'next',
                        href: '/store',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: { scroll: false },
                      }}
                    />
                  </li>

                  {user && meta.title !== 'Profile' && (
                    <li className="inline-flex items-center">
                      <Button
                        type="secondary"
                        size="medium"
                        text="Member Dashboard"
                        color="neutral-300"
                        fluid={false}
                        icon={null}
                        iconFloat={null}
                        inverted
                        loading={false}
                        disabled={false}
                        skeleton={false}
                        onClick={null}
                        withLinkProps={{
                          type: 'next',
                          href: '/profile',
                          target: null,
                          routerLink: Link,
                          routerLinkProps: { scroll: false },
                        }}
                      />
                    </li>
                  )}

                  {!user && (
                    <>
                      <li className="inline-flex items-center">
                        <Button
                          type="secondary"
                          size="medium"
                          text="Membership"
                          color="rendah-red"
                          fluid={false}
                          // icon={buttonIcons.store}
                          iconFloat={null}
                          inverted
                          loading={false}
                          disabled={false}
                          skeleton={false}
                          onClick={null}
                          withLinkProps={{
                            type: 'next',
                            href: '/membership',
                            target: null,
                            routerLink: Link,
                            routerLinkProps: { scroll: false },
                          }}
                        />
                      </li>
                      <li className="inline-flex items-center">
                        <Button
                          type="secondary"
                          size="medium"
                          text="Login"
                          color="neutral-300"
                          fluid={false}
                          // icon={buttonIcons.signIn}
                          iconFloat={null}
                          inverted
                          loading={false}
                          disabled={false}
                          skeleton={false}
                          onClick={null}
                          withLinkProps={{
                            type: 'next',
                            href: '/login',
                            target: null,
                            routerLink: Link,
                            routerLinkProps: { scroll: false },
                          }}
                        />
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
