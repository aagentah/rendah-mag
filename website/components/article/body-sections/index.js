import includes from 'lodash/includes';
import BlockContent from '@sanity/block-content-to-react';

import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

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
    // Remove stray breaks
    if (section?.children?.length) {
      if (
        section?.children[0]?.text === '\n' ||
        section?.children[0]?.text === ''
      ) {
        return false;
      }
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
