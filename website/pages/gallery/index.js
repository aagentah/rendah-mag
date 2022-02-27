import { useEffect, useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Parallax } from 'react-scroll-parallax';

import {
  Heading,
  Image,
  Button,
  Copy,
  Icon,
  Input,
} from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Hero from '~/components/hero/cypher';
import CardCypher from '~/components/card/cypher';

import {
  getSiteConfig,
  imageBuilder,
  getCurrentAndPreviousCyphers,
} from '~/lib/sanity/requests';

export default function Cyphers({ siteConfig }) {
  // const [cyphers, setCyphers] = useState(null);
  // const [cyphersLength, setCyphersLength] = useState(24);
  //
  // useEffect(() => {
  //   const action = async () => {
  //     const cyphersData = await getCurrentAndPreviousCyphers();
  //
  //     setCyphersLength(cyphersData.previous.length);
  //     setCyphers(cyphersData);
  //   };
  //
  //   action();
  // }, []);

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Cyphers',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <div className="creations">
          <div className="rich-text">
            <Parallax speed={-20}>
              <div className="flex  flex-wrap  mb6">
                <div className="col-24  flex  flex-wrap  justify-center">
                  <h2 className="t-primary  mb4  tac">
                    Lorem ipsum dolor sit amet
                  </h2>
                </div>

                <div className="col-24  flex  flex-wrap  justify-center  pb4">
                  <p className="measure-wide  tac">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation.
                  </p>
                </div>

                <div className="col-24  flex  flex-wrap  justify-center">
                  <Icon
                    className="light-grey"
                    icon={['fas', 'arrow-down']}
                    size="2x"
                  />
                </div>
              </div>
            </Parallax>

            <div className="flex  flex-wrap  mb6  pb6  pt6">
              <div className="col-24">
                <Parallax speed={-10}>
                  <img
                    className="w-100"
                    src="https://live.staticflickr.com/65535/49648737658_83f24c0399_k.jpg"
                  />
                </Parallax>
              </div>
            </div>

            <div className="flex  flex-wrap  pb6  mb4">
              <div className="col-12  ph4">
                <Parallax speed={0}>
                  <img
                    className="w-100  shadow3"
                    src="https://live.staticflickr.com/65535/50299213677_e0ff28d626_k.jpg"
                  />
                </Parallax>
              </div>

              <div className="col-12  ph5  pt6">
                <Parallax speed={-10}>
                  <h3 className="t-primary  mb4  tal">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="tal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                  </p>
                </Parallax>
              </div>
            </div>

            <div className="flex  flex-wrap  pb6  mb4">
              <div className="col-12  ph5  pt6">
                <Parallax speed={-10}>
                  <h3 className="t-primary  mb4  tar">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="tar">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                  </p>
                </Parallax>
              </div>

              <div className="col-12  ph4">
                <Parallax speed={0}>
                  <img
                    className="w-100  shadow3"
                    src="https://live.staticflickr.com/65535/50645020163_616fbc5179_k.jpg"
                  />
                </Parallax>
              </div>
            </div>

            <div className="flex  flex-wrap  mb6  pb6  pt6">
              <div className="col-24">
                <Parallax speed={-10}>
                  <img
                    className="w-100"
                    src="https://live.staticflickr.com/65535/49648737658_83f24c0399_k.jpg"
                  />
                </Parallax>
              </div>
            </div>

            <div className="flex  flex-wrap  pb6  mb4">
              <div className="col-12  ph4">
                <Parallax speed={0}>
                  <img
                    className="w-100  shadow3"
                    src="https://live.staticflickr.com/65535/50299213677_e0ff28d626_k.jpg"
                  />
                </Parallax>
              </div>

              <div className="col-12  ph5  pt6">
                <Parallax speed={-10}>
                  <h3 className="t-primary  mb4  tal">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="tal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                  </p>
                </Parallax>
              </div>
            </div>

            <div className="flex  flex-wrap  pb6  mb4">
              <div className="col-12  ph5  pt6">
                <Parallax speed={-10}>
                  <h3 className="t-primary  mb4  tar">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="tar">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                  </p>
                </Parallax>
              </div>

              <div className="col-12  ph4">
                <Parallax speed={0}>
                  <img
                    className="w-100  shadow3"
                    src="https://live.staticflickr.com/65535/50645020163_616fbc5179_k.jpg"
                  />
                </Parallax>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
