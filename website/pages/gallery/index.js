import { useEffect, useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Parallax } from 'react-scroll-parallax';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Hero from '~/components/hero/cypher';
import CardCypher from '~/components/card/cypher';
import GalleryInfo from '~/components/gallery/info';
import GalleryBanner from '~/components/gallery/banner';
import GalleryImageText from '~/components/gallery/image-text';

import { useApp } from '~/context-provider/app';

import {
  getSiteConfig,
  imageBuilder,
  getCurrentAndPreviousCyphers,
} from '~/lib/sanity/requests';

export default function Cyphers({ siteConfig }) {
  const app = useApp();
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
            <GalleryInfo />
            <GalleryBanner />
            <GalleryImageText align="left" />
            <GalleryImageText align="right" />
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
