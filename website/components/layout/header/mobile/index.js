import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useUser } from '~/lib/hooks';

const Modal = dynamic(() => import('~/components/modal'));
const ProfileEdit = dynamic(() => import('~/components/profile/edit'));
const ProfileBilling = dynamic(() => import('~/components/profile/billing'));
const ProfilePrints = dynamic(() => import('~/components/profile/prints'));

export default function HeaderMobile({
  meta,
  navColour,
  navHex,
  navOnneutral,
  handleLogout,
  buttonIcons,
}) {
  const [user] = useUser();
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);
  const [modalActive, setModalActive] = useState(false);
  const [modalPrintsActive, setModalPrintsActive] = useState(false);

  return (
    <div className={`h-20 ${navOnneutral - 300 ? 'text-neutral-800' : ''}`}>
      <div className="w-full flex flex-wrap">
        {/* Burger Button */}
        <button
          onClick={toggleNav}
          type="button"
          aria-label="Burger Menu"
          className="absolute top-7 right-6 bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="transition-colors duration-300 ease-in-out fill-neutral-200"
          >
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
          </svg>
        </button>

        {/* Logo */}
        <div className="absolute top-5 left-6 cursor-pointer size-10">
          <Link href="/" legacyBehavior>
            <a className="">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="1440"
                height="1440"
                viewBox="0 0 1080 1080"
                className="size-10"
              >
                <g className="transition-colors duration-300 ease-in-out fill-neutral-200">
                  <path d="M358 12.7c-158.6.8-288.7 1.6-288.9 1.9-.2.2 7 15.6 16.1 34.1l16.6 33.8 94.8.8c52.2.5 95 1 95.2 1.1.1.2-20.3 34.6-45.3 76.6-25.1 42-45.4 76.7-45.3 77.1.2.4 13.4 22.9 29.3 49.8l29 49 177.1.3 177 .3-94.8 153.8C466.7 576 424 645.6 424 646.1s11.6 19.9 25.8 43l25.7 42.2 86.8-.6c47.7-.3 86.7-.4 86.7-.2s-19.2 31.7-42.7 70.1c-23.4 38.5-42.8 70.6-43 71.5-.3.9 7.8 20.6 17.9 43.8l18.3 42.1h56l56-.1 42-71.9c23.1-39.6 42.2-72 42.5-72 .3 0 19.1 32.4 41.9 72l41.3 72h48.9c26.9 0 48.9-.4 48.9-.8 0-.5-40-70.5-89-155.6-48.9-85.1-89-155-89-155.5 0-.4 40.1-70 89-154.7 49-84.6 88.9-154.7 88.8-155.7-.2-1-40.3-74.4-89.3-163.2L798.5 11l-76 .2c-41.8 0-205.8.7-364.5 1.5z" />
                  <path d="M69.2 117.5c.4 2 83.2 157.5 83.8 157.5.6-.1 83.3-155.7 83.8-157.7.3-1.1-14.9-1.3-83.8-1.3-74 0-84.1.2-83.8 1.5zM410.4 758.7c.8 1.9 81.8 150 84.6 154.7l1.8 3 52.6-79.3c28.9-43.5 52.6-79.4 52.6-79.7 0-.2-43.2-.4-96.1-.4-90.4 0-96.1.1-95.5 1.7zM335.2 849.1c.6 1.7 48.2 75.8 48.8 75.8.4 0 39.8-73.3 40.8-76 .2-.5-19.4-.9-44.8-.9-32.3 0-45.1.3-44.8 1.1zM741 969c-31.9 53.4-58.4 97.8-58.7 98.6-.4 1.2 14.5 1.4 113.7 1.4 93.7 0 114.1-.2 113.8-1.3-.3-1.5-108.6-193.7-109.8-195-.5-.5-27 42.8-59 96.3z" />
                </g>
              </svg>
            </a>
          </Link>
        </div>
      </div>

      {/* Navigation Overlay */}
      <nav
        className={`fixed top-0 left-0 w-screen h-screen bg-neutral-300 z-[9999] transition-transform duration-500 ease-[cubic-bezier(0.985,0.33,0.155,0.87)] ${
          navOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-wrap pt-1.5">
          <div className="w-1/2 flex items-center justify-start p-4">
            <span className="bg-neutral-700 text-neutral-300 px-2 py-1 text-lg">
              Menu
            </span>
          </div>
          <button
            onClick={toggleNav}
            type="button"
            aria-label="Toggle Menu"
            className="w-1/2 flex items-center justify-end p-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-neutral-700"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>
        </div>
        <ul className="w-full pt-4">
          <li className="block pl-4 pb-3">
            <Link href="/" legacyBehavior>
              <button
                onClick={toggleNav}
                type="button"
                className="text-neutral-800 text-2xl border-b border-neutral-800 inline-block mb-2 pb-2"
              >
                Home
              </button>
            </Link>
          </li>
          {/*
          <li className="block pl-4 pb-3">
            <Link href="/cyphers" legacyBehavior>
              <button
                onClick={toggleNav}
                type="button"
                className="text-neutral-800 text-2xl border-b border-neutral-800 inline-block mb-2 pb-2"
              >
                Cyphers
              </button>
            </Link>
          </li>
          */}
          {/* <li className="block pl-4 pb-3">
            <Link href="/gallery" legacyBehavior>
              <button
                onClick={toggleNav}
                type="button"
                className="text-neutral-800 text-2xl border-b border-neutral-800 inline-block mb-2 pb-2"
              >
                Gallery
              </button>
            </Link>
          </li> */}
          {/*
          <li className="block pl-4 pb-3">
            <Link href="/team" legacyBehavior>
              <button
                onClick={toggleNav}
                type="button"
                className="text-neutral-800 text-2xl border-b border-neutral-800 inline-block mb-2 pb-2"
              >
                Team
              </button>
            </Link>
          </li>
          */}
          <li className="block pl-4 pb-3">
            <Link href="/store" legacyBehavior>
              <button
                onClick={toggleNav}
                type="button"
                className="text-neutral-800 text-2xl border-b border-neutral-800 inline-block mb-2 pb-2"
              >
                Store
              </button>
            </Link>
          </li>
          {user ? (
            <>
              <li className="block pl-4 pb-3">
                <Link href="/profile" legacyBehavior>
                  <button
                    onClick={toggleNav}
                    type="button"
                    className="text-rendah-red text-2xl border-b border-rendah-red inline-block mb-2 pb-2"
                  >
                    Member Dashboard
                  </button>
                </Link>
              </li>
              <li className="block pl-4 pb-3">
                <Link href="#" legacyBehavior>
                  <button
                    onClick={() => {
                      toggleNav();
                      handleLogout();
                    }}
                    type="button"
                    className="text-neutral-800 text-2xl border-b border-neutral-800 inline-block mb-2 pb-2"
                  >
                    Logout
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="block pl-4 pb-3">
                <Link href="/membership" legacyBehavior>
                  <button
                    onClick={toggleNav}
                    type="button"
                    className="text-red-600 text-2xl border-b border-neutral-800 inline-block mb-2 pb-2"
                  >
                    Membership
                  </button>
                </Link>
              </li>
              <li className="block pl-4 pb-3">
                <Link href="/login" legacyBehavior>
                  <button
                    onClick={toggleNav}
                    type="button"
                    className="text-neutral-800 text-2xl border-b border-neutral-800 inline-block mb-2 pb-2"
                  >
                    Login
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Optional Modals for Profile */}
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
    </div>
  );
}
