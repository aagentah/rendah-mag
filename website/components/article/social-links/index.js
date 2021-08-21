import { Icon } from 'next-pattern-library';

export default function SocialLinks({ article }) {
  if (article.socialHandles) {
    let links = [];

    if (article.socialHandles.soundcloud) {
      article.socialHandles.soundcloud.split(/\s*,\s*/).forEach((e) => {
        links.push(
          <a
            key={e}
            className="df  align-center  lh-copy  pb2  link  f6  black  t-body"
            title="soundcloud"
            href={`https://soundcloud.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon icon={['fab', 'soundcloud']} size="1x" />
            <span className="pl2">/ {e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.facebook) {
      article.socialHandles.facebook.split(/\s*,\s*/).forEach((e) => {
        links.push(
          <a
            key={e}
            className="df  align-center  lh-copy  pb2  link  f6  black  t-body"
            title="facebook"
            href={`https://facebook.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon icon={['fab', 'facebook']} size="1x" />
            <span className="pl2">/ {e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.twitter) {
      article.socialHandles.twitter.split(/\s*,\s*/).forEach((e) => {
        links.push(
          <a
            key={e}
            className="df  align-center  lh-copy  pb2  link  f6  black  t-body"
            title="twitter"
            href={`https://twitter.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon icon={['fab', 'twitter']} size="1x" />
            <span className="pl2">/ {e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.instagram) {
      article.socialHandles.instagram.split(/\s*,\s*/).forEach((e) => {
        links.push(
          <a
            key={e}
            className="df  align-center  lh-copy  pb2  link  f6  black  t-body"
            title="instagram"
            href={`https://instagram.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon icon={['fab', 'instagram']} size="1x" />
            <span className="pl2">/ {e}</span>
          </a>
        );
      });
    }

    return (
      <div className="article__social-links  mt3  pa4  br4  bg-almost-white">
        {links}
      </div>
    );
  }

  return false;
}
