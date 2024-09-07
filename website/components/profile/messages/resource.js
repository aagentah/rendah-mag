import Link from 'next/link';
import { useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import dynamic from 'next/dynamic';
import { saveAs } from 'file-saver';

import Heading from '~/components/elements/heading';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';
import { imageBuilder } from '~/lib/sanity/requests';
import Button from '~/components/elements/button';
import Modal from '~/components/modal';
import ImageNew from '~/components/elements/image-new';
import Sections from '~/components/article/body-sections';
import Audio from '~/components/article/body-sections/audio/index.js';

import {
  FaMusic,
  FaVideo,
  FaPalette,
  FaFileAlt,
  FaFilePdf,
  FaFileImage,
  FaFile,
  FaPaperclip,
  FaDownload,
} from 'react-icons/fa';

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

function getIconByMimeType(mimeType) {
  if (!mimeType) return <FaFile />;
  if (mimeType.startsWith('audio/')) return null;
  if (mimeType.startsWith('video/')) return <FaVideo />;
  if (mimeType.startsWith('image/')) return <FaFileImage />;
  if (mimeType === 'application/pdf') return <FaFilePdf />;
  return <FaFileAlt />;
}

export default function CarouselItemSection({ message, backButton }) {
  console.log('message', message);

  const buttonIconArrowLeft = <IconArrowLeft color="rendah-red" size={16} />;

  const image = (
    <ImageNew imageObject={message?.imageObject} height={50} className="br3" />
  );

  const [currentAudioSelected, setCurrentAudioSelected] = useState(null);

  const handleAudioPlay = (audioRef) => {
    if (currentAudioSelected && currentAudioSelected.current?.audio?.current) {
      currentAudioSelected.current.audio.current.pause();
    }

    setCurrentAudioSelected(audioRef);
  };

  return (
    <section className="pb4 pb6-md pt4 pt0-md">
      <div className="ph5-md">
        {/* bg-darker-grey pt4 pt5-md pb5 */}
        <div className="col-24 col-12-md mla mra">
          <div className="ph4 ph0-md">
            <div className="w-100 pb3">
              <Button
                /* Options */
                type="secondary"
                size="small"
                text="Back to resources"
                color="rendah-red"
                fluid={false}
                icon={buttonIconArrowLeft}
                iconFloat="left"
                inverted={true}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={null}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/profile?tab=resources',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: null,
                }}
              />
            </div>

            <div className="flex flex-wrap pv3">
              <div className="col-24 flex align-center">
                <div className="" style={{ width: '20%', maxWidth: '50px' }}>
                  {image}
                </div>

                <div className="pl3">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
                    text={message.title}
                    color="white"
                    size="large"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>
            </div>

            <p className="grey pb4 f6">Published {message.activeFrom}</p>
          </div>
        </div>

        {message?.description && (
          <div className="rich-text">
            <Sections body={message.description} />
          </div>
        )}

        {message?.attachments?.length && (
          <div className="col-24 col-12-md mla mra ph4 ph0-md">
            <div className="bg-darker-grey pa4 br3 white f5 mt4">
              <p className="t-primary f6 pb4 o-50">Attachement(s)</p>
              <div className="">
                <ul className="ls-none">
                  {message.attachments.map((attachment, index) => (
                    <li className="pv2" key={index}>
                      {attachment.mimeType.startsWith('audio/') ? (
                        <div className="pb3">
                          <div className="f7 f6-md flex flex-wrap align-center">
                            <span className="pr2 grey">
                              {getIconByMimeType(attachment.mimeType)}
                            </span>
                            <span className="white align-center pb3 dif w-100 flex justify-between  ph2">
                              {attachment.title}
                            </span>
                          </div>
                          <div>
                            <div className="flex flex-wrap align-center">
                              <div
                                className="flex flex-wrap align-center"
                                style={{ width: 'calc(100% - 30px)' }}
                              >
                                <Audio
                                  url={attachment.url}
                                  currentAudioSelected={currentAudioSelected}
                                  handleAudioPlay={handleAudioPlay}
                                />
                              </div>
                              <div
                                className="flex justify-end align-center"
                                style={{ width: '30px' }}
                              >
                                <a
                                  href={`${attachment.file}?dl=`}
                                  className="white "
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M12.553 16.506a.75.75 0 0 1-1.107 0l-4-4.375a.75.75 0 0 1 1.108-1.012l2.696 2.95V3a.75.75 0 0 1 1.5 0v11.068l2.697-2.95a.75.75 0 1 1 1.107 1.013l-4 4.375Z"
                                    />
                                    <path
                                      fill="currentColor"
                                      d="M3.75 15a.75.75 0 0 0-1.5 0v.055c0 1.367 0 2.47.117 3.337.12.9.38 1.658.981 2.26.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h6.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337V15a.75.75 0 0 0-1.5 0c0 1.435-.002 2.436-.103 3.192-.099.734-.28 1.122-.556 1.399-.277.277-.665.457-1.4.556-.755.101-1.756.103-3.191.103H9c-1.435 0-2.437-.002-3.192-.103-.734-.099-1.122-.28-1.399-.556-.277-.277-.457-.665-.556-1.4-.101-.755-.103-1.756-.103-3.191Z"
                                    />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={`${attachment.file}?dl=`}
                          className="white align-center pb3 dif w-100 flex justify-between bb bc-grey ph2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="f7 f6-md flex align-center">
                            <span className="pr2 grey">
                              {getIconByMimeType(attachment.mimeType)}
                            </span>
                            {attachment.title}
                          </div>
                          <div className="align-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M12.553 16.506a.75.75 0 0 1-1.107 0l-4-4.375a.75.75 0 0 1 1.108-1.012l2.696 2.95V3a.75.75 0 0 1 1.5 0v11.068l2.697-2.95a.75.75 0 1 1 1.107 1.013l-4 4.375Z"
                              />
                              <path
                                fill="currentColor"
                                d="M3.75 15a.75.75 0 0 0-1.5 0v.055c0 1.367 0 2.47.117 3.337.12.9.38 1.658.981 2.26.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h6.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337V15a.75.75 0 0 0-1.5 0c0 1.435-.002 2.436-.103 3.192-.099.734-.28 1.122-.556 1.399-.277.277-.665.457-1.4.556-.755.101-1.756.103-3.191.103H9c-1.435 0-2.437-.002-3.192-.103-.734-.099-1.122-.28-1.399-.556-.277-.277-.457-.665-.556-1.4-.101-.755-.103-1.756-.103-3.191Z"
                              />
                            </svg>
                          </div>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
