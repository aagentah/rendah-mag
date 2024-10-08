import includes from 'lodash/includes';
import BlockContent from '@sanity/block-content-to-react';

import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

import Heading from './heading';
import Quote from './quote';
import Image from './image';
import Carousel from './carousel';
import IframeBlock from './iframe';
import Soundcloud from './soundcloud';
import Spotify from './spotify';
import Youtube from './youtube';
import FacebookVideo from './facebook-video';
import Audio from './audio';
import ArticleLink from './article-link';
import CodeBlock from './code-block';

export default function Sections({ body, ...props }) {
  let imageCount = 0;

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

    // para
    if (section._type === 'block') {
      return (
        <>
          <div className="flex  flex-wrap  ph4  ph0-md">
            <div className="col-6" />
            <div className="col-24  col-12-md  rich-text">
              <BlockContent
                blocks={section}
                serializers={SANITY_BLOCK_SERIALIZERS}
              />
            </div>
            <div className="col-6" />
          </div>
        </>
      );
    }

    // image
    if (
      section._type === 'image' &&
      (includes(section.asset._ref, '-jpg') ||
        includes(section.asset._ref, '-png') ||
        includes(section.asset._ref, '-gif'))
    ) {
      imageCount++;

      return (
        <div key={i}>
          <Image section={section} imageCount={imageCount} />
        </div>
      );
    }

    // carousel
    if (section._type === 'carousel') {
      return (
        <div key={i} className="pv4  ph4  ph0-md">
          <Carousel section={section} />
        </div>
      );
    }

    // soundcloud embed
    if (section._type === 'iframeEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <IframeBlock
            url={section.iframeUrl}
            heightDesktop={
              section.iframeHeightDesktop
                ? section.iframeHeightDesktop
                : section.iframeHeight
            }
            heightMobile={section.iframeHeightMobile}
          />
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
    // if (section._type === 'audioEmbedBlock') {
    //   return (
    //     <div key={i} className="pv3">
    //       <AudioEmbed
    //         {...props}
    //         i={i}
    //         title={section?.title}
    //         description={section?.description}
    //         image={section?.image}
    //         url={section?.audioEmbed}
    //         allowDownload={section?.allowDownload}
    //       />
    //     </div>
    //   );
    // }

    if (section._type === 'audioFileBlock') {
      console.log('aaa', section);
      return (
        <div key={i} className="pv3">
          <Audio
            {...props}
            i={i}
            title={section?.title}
            description={section?.description}
            image={section?.image}
            url={section?.url}
            allowDownload={section?.allowDownload}
          />
        </div>
      );
    }

    // codeBlock
    if (section._type === 'codeBlock') {
      return (
        <CodeBlock
          {...props}
          i={i}
          language={section.language}
          code={section.code}
        />
      );
    }

    // subtitleBlock
    if (section._type === 'subtitleBlock') {
      return (
        <div key={i} className="pv2  mb2  ph4  ph0-md">
          <Heading text={section.subtitle} />
        </div>
      );
    }

    // quoteBlock
    if (section._type === 'quoteBlock') {
      return (
        <div key={i} className="pv2  mb2  ph4  ph0-md">
          <Quote quote={section.quote} source={section.source} />
        </div>
      );
    }

    // linkBlock
    if (section._type === 'linkBlock') {
      return (
        <div key={i} className="pv2  mb2  ph4  ph0-md">
          <ArticleLink text={section.text} url={section.url} />
        </div>
      );
    }

    return false;
  };

  return <>{body.map((section, i) => renderSections(section, i))}</>;
}
