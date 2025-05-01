import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Iframe from 'react-iframe';
import LazyLoad from 'react-lazyload';
import BlockContent from '@sanity/block-content-to-react';
import YouTube from 'react-youtube';
import SpotifyPlayer from 'react-spotify-player';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import find from 'lodash/find';
import { usePlausible } from 'next-plausible';

import { SANITY_BLOCK_SERIALIZERS } from '~/constants';
import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';
import { useFirstRender } from '~/lib/useFirstRender';

const Carousel = dynamic(() => import('./carousel'), {
  ssr: false,
  loading: () => null,
});

hljs.registerLanguage('javascript', javascript);

function Heading({ text }) {
  return (
    <div className="flex flex-wrap pb-3">
      <div className="w-full">
        <h2 className=" text-2xl md:text-3xl">
          {'> '} {text}
        </h2>
      </div>
    </div>
  );
}

function Quote({ quote, source }) {
  return (
    <div className="flex flex-wrap py-3">
      <blockquote className="border-l-4 border-rendah-red pl-4">
        <p className=" text-md">
          “{quote}”
          <cite className="block text-sm pt-2 text-neutral-400">
            / {source}
          </cite>
        </p>
      </blockquote>
    </div>
  );
}

function Paragraph({ text, markDefs }) {
  const renderChildren = (child, i) => {
    if (child.marks) {
      const currentMark =
        child.marks.length && find(markDefs, { _key: child.marks[0] });
      if (currentMark && currentMark.url) {
        return (
          <a
            key={i}
            rel="noopener noreferrer"
            target="_blank"
            href={currentMark.url}
            className="underline"
          >
            {child.text}
          </a>
        );
      }
      if (child.marks.includes('strong') && child.marks.includes('em')) {
        return (
          <strong key={i}>
            <em>{child.text}</em>
          </strong>
        );
      }
      if (child.marks.includes('strong')) {
        return <strong key={i}>{child.text}</strong>;
      }
      if (child.marks.includes('em')) {
        return <em key={i}>{child.text}</em>;
      }
    }
    return child.text;
  };

  if (text[0]?.text?.trim()) {
    return (
      <div className="flex flex-wrap py-4">
        <div className="w-full flex justify-center">
          <p className=" text-sm md:text-base py-3">
            {text.map((child, i) => renderChildren(child, i))}
          </p>
        </div>
      </div>
    );
  }
  return null;
}

function ListItem({ text }) {
  const renderChildren = (child, i) => {
    if (child.marks) {
      if (child.marks.includes('strong') && child.marks.includes('em')) {
        return (
          <strong key={i}>
            <em>{child.text}</em>
          </strong>
        );
      }
      if (child.marks.includes('strong')) {
        return <strong key={i}>{child.text}</strong>;
      }
      if (child.marks.includes('em')) {
        return <em key={i}>{child.text}</em>;
      }
    }
    return child.text;
  };

  if (text[0]?.text) {
    return (
      <div className="flex flex-wrap py-4">
        <div className="w-full flex justify-center">
          <li className=" text-sm md:text-base pl-3">
            - {text.map((child, i) => renderChildren(child, i))}
          </li>
        </div>
      </div>
    );
  }
  return null;
}

function CodeBlock({ language, code }) {
  const highlighted = hljs.highlight(code, { language }).value;
  return (
    <LazyLoad once offset={250} height={360}>
      <div className="flex flex-wrap py-4">
        <div className="w-full flex justify-center">
          <pre className="w-full p-4 rounded">
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          </pre>
        </div>
      </div>
    </LazyLoad>
  );
}

function IframeBlock({ url, heightDesktop, heightMobile }) {
  const app = useApp();
  const frameHeight =
    heightMobile && app.deviceSize === 'md' ? heightMobile : heightDesktop;

  if (url.includes('vimeo')) {
    return (
      <div className="py-12">
        <div className="relative" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={url}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={url}
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <Script src="https://player.vimeo.com/api/player.js" />
      </div>
    );
  }

  return (
    <LazyLoad once offset={250} height={frameHeight}>
      <div className="flex flex-wrap py-4">
        <div className="w-full flex justify-center">
          <div className="w-11/12">
            <Iframe
              url={url}
              width="100%"
              height={frameHeight}
              display="initial"
              position="relative"
            />
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}

function FacebookVideo({ url }) {
  const app = useApp();
  const [FBProvider, setFBProvider] = useState(null);
  const [EmbeddedVideo, setEmbeddedVideo] = useState(null);

  useEffect(() => {
    if (!FBProvider || !EmbeddedVideo) {
      import('react-facebook').then((mod) => {
        setFBProvider(() => mod.FacebookProvider);
        setEmbeddedVideo(() => mod.EmbeddedVideo);
      });
    }
  }, [FBProvider, EmbeddedVideo]);

  if (!FBProvider || !EmbeddedVideo) return null;

  return (
    <LazyLoad once offset={250} height={app.deviceSize === 'md' ? 266 : 490}>
      <div className="flex flex-wrap py-4">
        <div className="w-full flex justify-center">
          <div className="w-11/12 text-center">
            <FBProvider appId="154881868603516">
              <EmbeddedVideo href={url} />
            </FBProvider>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}

function Spotify({ uri }) {
  const size = { width: '100%', height: 80 };
  const view = 'list';
  const theme = 'black';
  return (
    <div className="flex flex-wrap py-4">
      <div className="w-full flex justify-center">
        <div className="w-full md:px-4">
          <LazyLoad once offset={250} height={100}>
            <SpotifyPlayer uri={uri} size={size} view={view} theme={theme} />
          </LazyLoad>
        </div>
      </div>
    </div>
  );
}

function Youtube({ videoId }) {
  return (
    <LazyLoad once offset={300} height={360}>
      <div className="flex flex-wrap py-4">
        <div className="w-full flex justify-center">
          <YouTube className="w-11/12 mx-auto" videoId={videoId} />
        </div>
      </div>
    </LazyLoad>
  );
}

function ImageSection({ section, imageCount, fullWidth }) {
  console.log('section', section);
  const handleCaption = () => {
    if (isArray(section?.caption)) {
      return (
        <figcaption className="text-xxs py-2 opacity-50">
          <BlockContent
            blocks={section.caption}
            serializers={SANITY_BLOCK_SERIALIZERS}
          />
        </figcaption>
      );
    }
    if (section?.caption) {
      if (section.source) {
        return (
          <a
            href={section.source}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2 underline"
          >
            {section.caption}
          </a>
        );
      }
      return <span className="block text-center py-2">{section.caption}</span>;
    }
    return null;
  };

  const placeholder = includes(section.asset._ref, '-gif')
    ? null
    : imageBuilder
        .image(section.asset)
        .height(25)
        .width(25)
        .auto('format')
        .fit('clip')
        .blur('20')
        .url();

  return (
    <div className="grid grid-cols-12">
      <div
        className={`col-span-12 ${
          section.fullImage ? 'md:col-span-9' : 'md:col-span-6'
        }`}
      >
        <LazyLoad once offset={250} height={360}>
          <figure>
            <img
              className="w-full"
              src={imageBuilder.image(section).auto('format').fit('clip').url()}
              alt=""
            />
            {handleCaption()}
          </figure>
        </LazyLoad>
      </div>
    </div>
  );
}

function Soundcloud({ url }) {
  const scUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${url}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
  return (
    <LazyLoad once offset={250} height={166}>
      <div className="flex flex-wrap py-3">
        <div className="w-full flex justify-center">
          <div className="w-11/12">
            <Iframe
              url={scUrl}
              width="100%"
              height="166"
              display="initial"
              position="relative"
            />
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}

function Audio({ url, title, image, description, allowDownload, ...props }) {
  const [AudioPlayer, setAudioPlayer] = useState(null);
  const [RHAP_UI, setRHAP_UI] = useState(null);
  const plausible = usePlausible();
  const playerRef = useRef(null);
  const { currentAudioSelected, handleAudioPlay } = props;

  useEffect(() => {
    if (!AudioPlayer || !RHAP_UI) {
      import('react-h5-audio-player').then((mod) => {
        setAudioPlayer(() => mod.default);
        setRHAP_UI(() => mod.RHAP_UI);
      });
    }
  }, [AudioPlayer, RHAP_UI]);

  useEffect(() => {
    if (
      playerRef.current?.audio?.current &&
      currentAudioSelected !== playerRef
    ) {
      playerRef.current.audio.current.pause();
    }
  }, [currentAudioSelected]);

  const triggerOnPlayEvt = () => {
    plausible('Audio Play', {
      props: {
        action: 'play',
        label: title,
      },
    });
  };

  if (!url || !AudioPlayer || !RHAP_UI) return null;

  return (
    <>
      {title && (
        <div className="w-full text-center py-2">
          <p className=" text-sm">{title}</p>
        </div>
      )}
      <AudioPlayer
        ref={playerRef}
        showSkipControls={false}
        showJumpControls={false}
        src={url}
        customProgressBarSection={[RHAP_UI.PROGRESS_BAR, RHAP_UI.CURRENT_TIME]}
        layout="horizontal-reverse"
        onPlay={() => {
          handleAudioPlay && handleAudioPlay(playerRef);
          triggerOnPlayEvt();
        }}
      />
    </>
  );
}

function ArticleLink({ text, url }) {
  return (
    <div className="w-full py-3 text-rendah-red">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm py-2 rounded underline"
      >
        {text}
      </a>
    </div>
  );
}

export default function Sections({ body, fullWidth = false, ...props }) {
  let imageCount = 0;
  const columnClass = fullWidth ? 'col-span-12' : 'col-span-12 md:col-span-6';

  const renderSections = (section, i) => {
    if (section?.children?.length) {
      if (
        section.children[0]?.text === '\n' ||
        section.children[0]?.text === ''
      ) {
        return null;
      }
    }
    if (section._type === 'block') {
      return (
        <div key={i} className="col-span-12 grid grid-cols-12">
          <div key={i} className={`${columnClass} grid gap-12 text-justify`}>
            <BlockContent
              blocks={section}
              serializers={SANITY_BLOCK_SERIALIZERS}
            />
          </div>
        </div>
      );
    }
    if (
      section._type === 'image' &&
      (includes(section.asset._ref, '-jpg') ||
        includes(section.asset._ref, '-png') ||
        includes(section.asset._ref, '-gif'))
    ) {
      imageCount++;
      return (
        <div className="col-span-12 py-4" key={i}>
          <ImageSection
            section={section}
            imageCount={imageCount}
            fullWidth={fullWidth}
          />
        </div>
      );
    }
    if (section._type === 'carousel') {
      return (
        <div key={i} className={`${columnClass} py-4`}>
          <Carousel section={section} />
        </div>
      );
    }
    if (section._type === 'iframeEmbedBlock') {
      return (
        <div key={i} className={`${columnClass} py-4`}>
          <IframeBlock
            url={section.iframeUrl}
            heightDesktop={section.iframeHeightDesktop || section.iframeHeight}
            heightMobile={section.iframeHeightMobile}
          />
        </div>
      );
    }
    if (section._type === 'soundCloudEmbedBlock') {
      return (
        <div key={i} className={`${columnClass} py-4`}>
          <Soundcloud url={section.soundCloudEmbed} />
        </div>
      );
    }
    if (section._type === 'spotifyEmbedBlock') {
      return (
        <div key={i} className={`${columnClass} py-4`}>
          <Spotify uri={section.spotifyEmbed} />
        </div>
      );
    }
    if (section._type === 'youTubeEmbedBlock') {
      return (
        <div key={i} className={`${columnClass} py-4`}>
          <Youtube videoId={section.youTubeEmbed} />
        </div>
      );
    }
    if (section._type === 'facebookVideoEmbedBlock') {
      return (
        <div key={i} className={`${columnClass} py-4`}>
          <FacebookVideo url={section.facebookVideoEmbed} />
        </div>
      );
    }
    if (section._type === 'audioFileBlock') {
      return (
        <div key={i} className={`${columnClass} py-3`}>
          <Audio
            {...props}
            title={section.title}
            description={section.description}
            image={section.image}
            url={section.url}
            allowDownload={section.allowDownload}
          />
        </div>
      );
    }
    if (section._type === 'codeBlock') {
      return (
        <CodeBlock key={i} language={section.language} code={section.code} />
      );
    }
    if (section._type === 'subtitleBlock') {
      return (
        <div key={i} className={`${columnClass} py-2 mb-2 px-4 md:px-0`}>
          <Heading text={section.subtitle} />
        </div>
      );
    }
    if (section._type === 'quoteBlock') {
      return (
        <div key={i} className={`${columnClass} py-2 mb-2 px-4 md:px-0`}>
          <Quote quote={section.quote} source={section.source} />
        </div>
      );
    }
    if (section._type === 'linkBlock') {
      return (
        <div key={i} className={`${columnClass} py-2 mb-2 px-4 md:px-0`}>
          <ArticleLink text={section.text} url={section.url} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`rich-text ${fullWidth ? '' : 'container'}`}>
      <div className="grid grid-cols-12 text-neutral-300 text-sm gap-y-4">
        {body.map((section, i) => renderSections(section, i))}
      </div>
    </div>
  );
}
