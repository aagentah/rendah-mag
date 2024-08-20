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

function myPortableTextComponents() {
  return {
    types: {
      image: (value) => {
        if (!value?.node?.asset) {
          return null;
        }

        return (
          <div className="bg-darker-grey pa4 pa5-md w-100 mv4 br3">
            <div className="w-100 mla mra mw6">
              <ImageNew imageObject={value?.node?.imageObject} />
            </div>
          </div>
        );
      },
    },
  };
}

function getIconByMimeType(mimeType) {
  if (!mimeType) return <FaFile />;
  if (mimeType.startsWith('audio/')) return <FaMusic />;
  if (mimeType.startsWith('video/')) return <FaVideo />;
  if (mimeType.startsWith('image/')) return <FaFileImage />;
  if (mimeType === 'application/pdf') return <FaFilePdf />;
  return <FaFileAlt />;
}

function groupAttachmentsByMimeType(attachments) {
  const grouped = {};

  attachments.forEach((attachment) => {
    const icon = getIconByMimeType(attachment.mimeType);
    const iconKey = icon.type.displayName || icon.type.name;

    if (grouped[iconKey]) {
      grouped[iconKey].count += 1;
    } else {
      grouped[iconKey] = { icon, count: 1 };
    }
  });

  return Object.values(grouped);
}

export default function CarouselItemSection({ message, backButton }) {
  console.log('message', message);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [downloadButtonLoading, setDownloadButtonLoading] = useState(false);

  const buttonIconArrowLeft = <IconArrowLeft color="white" size={16} />;
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // const handleDownloadAll = async () => {
  //   setDownloadButtonLoading(true);

  //   const response = await fetch('/api/download-attachments', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ attachments: message.attachments }),
  //   });

  //   if (response.ok) {
  //     const blob = await response.blob();
  //     saveAs(blob, `rendah-mag-dominion-${message.activeFrom}.zip`);
  //   } else {
  //     console.error('Failed to download attachments');
  //   }

  //   setDownloadButtonLoading(false);
  // };

  return (
    <section className="pb6">
      <div className="container mla mra">
        <div className="flex flex-wrap pb4 mb4 bb bc-white">
          <div className="col-12 pb1">
            <Button
              /* Options */
              type="secondary"
              size="small"
              text="Back"
              color="white"
              fluid={false}
              icon={buttonIconArrowLeft}
              iconFloat="left"
              inverted={true}
              loading={false}
              disabled={false}
              skeleton={false}
              onClick={backButton}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="col-12 flex align-center justify-end pb1 rendah-red f6">
            {message?.attachments?.length && (
              <div className="cp flex" onClick={toggleModal}>
                <div className="pr1">{'['}</div>
                <div className="flex align-center pr1">Attachments</div>

                <div className="flex align-center">
                  {groupAttachmentsByMimeType(message.attachments).map(
                    ({ icon, count }, index) => (
                      <span
                        key={index}
                        className="pa2 pa0-md ph1-md bg-transparent-md flex"
                      >
                        <span className="pr2">{count}x</span> {icon}
                      </span>
                    )
                  )}
                  {']'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-24 col-12-md mla mra ph4 ph0-md">
        <div className="pv3">
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

        <p className="grey pb4 f6">
          Written by {message.from} on {message.activeFrom}
        </p>

        <div className="rich-text">
          <BlockContent
            blocks={message.description}
            serializers={{
              ...SANITY_BLOCK_SERIALIZERS,
              ...myPortableTextComponents(),
            }}
          />
        </div>
      </div>

      {isModalOpen && (
        <Modal size="medium" active={isModalOpen} closeIcon={toggleModal}>
          <div className="pv3 white f5">
            <p className="t-title f5 pb4">
              This message features {message.attachments.length} exclusive
              Dominion attachments:
            </p>
            <div className="">
              <ul className="ls-none">
                {message.attachments.map((attachment, index) => (
                  <li className="pv2" key={index}>
                    {attachment.file ? (
                      <a
                        href={`${attachment.file}?dl=`}
                        className="white align-center pb3 dif w-100 flex justify-between bb bc-mid-grey ph2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="dif align-center">
                          <span className="pr2 mid-grey">
                            {getIconByMimeType(attachment.mimeType)}
                          </span>
                          {attachment.title}
                        </div>
                        <div className="align-center">
                          <FaDownload />
                        </div>
                      </a>
                    ) : (
                      <a
                        href={attachment.url}
                        className="white align-center pb2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="pr2">
                          <FaFileAlt />
                        </span>
                        {attachment.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="mw4">
              <Button
                type="primary"
                size="small"
                text="Download All"
                color="white"
                fluid={true}
                icon={null}
                iconFloat={null}
                inverted={true}
                loading={downloadButtonLoading}
                disabled={!message.attachments?.length || downloadButtonLoading}
                onClick={handleDownloadAll}
                withLinkProps={null}
              />
            </div> */}
          </div>
        </Modal>
      )}
    </section>
  );
}
