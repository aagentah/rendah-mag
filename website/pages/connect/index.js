import 'intersection-observer';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

const IconInstagram = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconInstagram)
);

const IconFacebook = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconFacebook)
);

const IconTwitter = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconTwitter)
);

const IconSoundcloud = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconSoundcloud)
);

const IconYoutube = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconYoutube)
);

const IconDiscord = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconDiscord)
);

const IconSpotify = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconSpotify)
);

export default function Connect({ siteConfig, preview }) {
  const app = useApp();

  return (
    <Layout
      navOffset="center"
      navOnWhite
      hasNav
      hasFooter={false}
      meta={{
        siteConfig,
        title: 'Connect',
        description: null,
        image: null
      }}
      preview={preview}
    >
      <Container>
        <div className="flex  justify-center  pb4  pb5-md">
          <Heading
            /* Options */
            htmlEntity="h3"
            text="Connect with Rendah Mag"
            color="black"
            size="medium"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="flex  flex-wrap  col-24">
          <div className="col-8  col-3-md  flex  justify-end  justify-end-md  pt4  pt0-md">
            <a
              href="https://www.instagram.com/rendahmag/"
              target="_blank"
              rel="noreferrer"
              className="black"
            >
              <IconInstagram color="white" size={30} />
            </a>
          </div>
          <div className="col-8  col-3-md  flex  justify-center  justify-end-md  pt4  pt0-md">
            <a
              href="https://www.facebook.com/rendahmag/"
              target="_blank"
              rel="noreferrer"
              className="black"
            >
              <IconFacebook color="white" size={30} />
            </a>
          </div>
          <div className="col-8  col-3-md  flex  justify-start  justify-end-md  pt4  pt0-md">
            <a
              href="https://twitter.com/RendahMag"
              target="_blank"
              rel="noreferrer"
              className="black"
            >
              <IconTwitter color="white" size={30} />
            </a>
          </div>

          <div className="col-8  col-3-md  flex  justify-end  justify-end-md  pt4  pt0-md">
            <a
              href="https://soundcloud.com/rendahmag"
              target="_blank"
              rel="noreferrer"
              className="black"
            >
              <IconSoundcloud color="white" size={30} />
            </a>
          </div>
          <div className="col-8  col-3-md  flex  justify-center  justify-end-md  pt4  pt0-md">
            <a
              href="https://www.youtube.com/channel/UC4dYeD1ceX8sSY3J3UuMn8w"
              target="_blank"
              rel="noreferrer"
              className="black"
            >
              <IconYoutube color="white" size={30} />
            </a>
          </div>
          <div className="col-8  col-3-md  flex  justify-start  justify-end-md  pt4  pt0-md">
            <a
              href="https://discord.com/invite/ev2Q22C"
              target="_blank"
              rel="noreferrer"
              className="black"
            >
              <IconDiscord color="white" size={30} />
            </a>
          </div>
          <div className="col-24  col-3-md  dn  df-md  justify-center  justify-end-md  pt4  pt0-md">
            <a
              href="https://open.spotify.com/user/z7wa87uoc308b4dmp8qpoukdf?si=28825cb6910f4e39"
              target="_blank"
              rel="noreferrer"
              className="black"
            >
              <IconSpotify color="white" size={30} />
            </a>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig
    }
  };
}

// export async function getStaticProps({ req, params, preview = false }) {
//   const siteConfig = await getSiteConfig();
//   const data = await getSmartLink(params.slug, preview);
//
//   return {
//     props: {
//       siteConfig,
//       post: data || null,
//       preview,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const data = await getAllPostsTotal();
//
//   return {
//     paths:
//       data.map((article) => ({
//         params: {
//           slug: article.slug,
//         },
//       })) || [],
//     fallback: true,
//   };
// }
