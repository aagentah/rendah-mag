import dynamic from 'next/dynamic';
import Link from 'next/link';

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

export default function SocialLinks({ article }) {
  if (article.socialHandles) {
    let links = [];
    let tags = [];

    if (article.socialHandles.soundcloud) {
      article.socialHandles.soundcloud.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`soundcloud-${e}-${i}`}
            className="df  align-center  lh-copy  pb2  link  f6  black  t-body"
            title="soundcloud"
            href={`https://soundcloud.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconSoundcloud color="black" size={16} />
            <span className="pl2">/ {e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.facebook) {
      article.socialHandles.facebook.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`facebook-${e}-${i}`}
            className="df  align-center  lh-copy  pb2  link  f6  black  t-body"
            title="facebook"
            href={`https://facebook.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconFacebook color="black" size={16} />
            <span className="pl2">/ {e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.twitter) {
      article.socialHandles.twitter.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`twitter-${e}-${i}`}
            className="df  align-center  lh-copy  pb2  link  f6  black  t-body"
            title="twitter"
            href={`https://twitter.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconTwitter color="black" size={16} />
            <span className="pl2">/ {e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.instagram) {
      article.socialHandles.instagram.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`instagram-${e}-${i}`}
            className="df  align-center  lh-copy  pb2  link  f6  black  t-body"
            title="instagram"
            href={`https://instagram.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconInstagram color="black" size={16} />
            <span className="pl2">/ {e}</span>
          </a>
        );
      });
    }

    if (article?.tags?.length) {
      tags.push(
        <p className="t-primary  f6  fw7  almost-black  lh-copy  pb2">Tags:</p>
      );

      tags.push(
        article.tags.map(e => (
          <>
            <Link href={`/tag/${e.tag.slug}`} legacyBehavior>
              <span className="t-secondary  f7  cp  grey  fw7  pr3">
                #{e.tag.name}
              </span>
            </Link>
          </>
        ))
      );
    }

    return (
      <div className="article__social-links  mt3  pa4  br4  bg-almost-white">
        {tags?.length ? <div className="pb4">{tags}</div> : ''}
        {links?.length ? links : ''}
      </div>
    );
  }

  return false;
}
