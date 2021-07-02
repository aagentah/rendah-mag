import includes from 'lodash/includes';
import BlockContent from '@sanity/block-content-to-react';

import Heading from './heading';
import Quote from './quote';
import Image from './image';
import IframeBlock from './iframe';
import Soundcloud from './soundcloud';
import Spotify from './spotify';
import Youtube from './youtube';
import FacebookVideo from './facebook-video';
import AudioEmbed from './audio';
import ArticleLink from './article-link';

export default function Sections({ body, ...props }) {
  const renderSections = (section, i) => {
    const serializers = {
      marks: {
        inlineLink: (linkProps) => {
          return (
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="di  underline"
              href={linkProps.mark.url}
            >
              {linkProps.children[0]}
            </a>
          );
        },
      },
    };

    // para
    if (section._type === 'block') {
      return (
        <div key={i}>
          <BlockContent blocks={section} serializers={serializers} />
        </div>
      );
    }

    // image
    if (
      section._type === 'image' &&
      (includes(section.asset._ref, '-jpg') ||
        includes(section.asset._ref, '-png'))
    ) {
      return (
        <div key={i} className="pv4">
          <Image section={section} />
        </div>
      );
    }

    // soundcloud embed
    if (section._type === 'iframeEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <IframeBlock url={section.iframeUrl} height={section.iframeHeight} />
        </div>
      );
    }

    // soundcloud embed
    if (section._type === 'soundCloudEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <Soundcloud url={section.soundCloudEmbed} />
        </div>
      );
    }

    // spotify embed
    if (section._type === 'spotifyEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <Spotify uri={section.spotifyEmbed} />
        </div>
      );
    }

    // soundcloud embed
    if (section._type === 'youTubeEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <Youtube videoId={section.youTubeEmbed} />
        </div>
      );
    }

    // facebook video embed
    if (section._type === 'facebookVideoEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <FacebookVideo url={section.facebookVideoEmbed} />
        </div>
      );
    }

    // audio embed
    if (section._type === 'audioEmbedBlock') {
      console.log('section', section);
      return (
        <div key={i} className="pv3">
          <AudioEmbed
            {...props}
            i={i}
            title={section?.title}
            description={section?.description}
            url={section?.audioEmbed}
            allowDownload={section?.allowDownload}
          />
        </div>
      );
    }

    // subtitleBlock
    if (section._type === 'subtitleBlock') {
      return (
        <div key={i} className="pv2  mb2">
          <Heading text={section.subtitle} />
        </div>
      );
    }

    // quoteBlock
    if (section._type === 'quoteBlock') {
      return (
        <div key={i} className="pv2  mb2">
          <Quote quote={section.quote} source={section.source} />
        </div>
      );
    }

    // linkBlock
    if (section._type === 'linkBlock') {
      return (
        <div key={i} className="pv2  mb2">
          <ArticleLink text={section.text} url={section.url} />
        </div>
      );
    }

    return false;
  };

  return <>{body.map((section, i) => renderSections(section, i))}</>;
}
