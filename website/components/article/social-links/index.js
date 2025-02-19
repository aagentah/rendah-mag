import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faSoundcloud,
  faYoutube,
  faDiscord,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';

export default function SocialLinks({ article }) {
  if (article.socialHandles) {
    const links = [];

    if (article.socialHandles.soundcloud) {
      article.socialHandles.soundcloud.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`soundcloud-${e}-${i}`}
            className="flex items-center py-2 pr-3 md:pr-4 text-sm text-neutral-400 hover:underline"
            title="soundcloud"
            href={`https://soundcloud.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faSoundcloud} style={{ fontSize: '16px' }} />
            <span className="pl-2">{e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.facebook) {
      article.socialHandles.facebook.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`facebook-${e}-${i}`}
            className="flex items-center py-2 pr-3 md:pr-4 text-sm text-neutral-400 hover:underline"
            title="facebook"
            href={`https://facebook.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '16px' }} />
            <span className="pl-2">{e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.twitter) {
      article.socialHandles.twitter.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`twitter-${e}-${i}`}
            className="flex items-center py-2 pr-3 md:pr-4 text-sm text-neutral-400 hover:underline"
            title="twitter"
            href={`https://twitter.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '16px' }} />
            <span className="pl-2">{e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.instagram) {
      article.socialHandles.instagram.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`instagram-${e}-${i}`}
            className="flex items-center py-2 pr-3 md:pr-4 text-sm text-neutral-400 hover:underline"
            title="instagram"
            href={`https://instagram.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '16px' }} />
            <span className="pl-2">{e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.youtube) {
      article.socialHandles.youtube.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`youtube-${e}-${i}`}
            className="flex items-center py-2 pr-3 md:pr-4 text-sm text-neutral-400 hover:underline"
            title="youtube"
            href={`https://youtube.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faYoutube} style={{ fontSize: '16px' }} />
            <span className="pl-2">{e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.discord) {
      article.socialHandles.discord.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`discord-${e}-${i}`}
            className="flex items-center py-2 pr-3 md:pr-4 text-sm text-neutral-400 hover:underline"
            title="discord"
            href={`https://discord.com/users/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faDiscord} style={{ fontSize: '16px' }} />
            <span className="pl-2">{e}</span>
          </a>
        );
      });
    }

    if (article.socialHandles.spotify) {
      article.socialHandles.spotify.split(/\s*,\s*/).forEach((e, i) => {
        links.push(
          <a
            key={`spotify-${e}-${i}`}
            className="flex items-center py-2 pr-3 md:pr-4 text-sm text-neutral-400 hover:underline"
            title="spotify"
            href={`https://open.spotify.com/user/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faSpotify} style={{ fontSize: '16px' }} />
            <span className="pl-2">{e}</span>
          </a>
        );
      });
    }

    return (
      <div className="container flex flex-wrap justify-start">
        {links.length ? links : null}
      </div>
    );
  }

  return false;
}
