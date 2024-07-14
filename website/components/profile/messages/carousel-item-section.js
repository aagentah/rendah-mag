import { useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import dynamic from 'next/dynamic';
import Heading from '~/components/elements/heading';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';
import { imageBuilder } from '~/lib/sanity/requests';
import Button from '~/components/elements/button';
import Modal from '~/components/modal';
import {
  FaMusic,
  FaVideo,
  FaPalette,
  FaFileAlt,
  FaFilePdf,
  FaFileImage,
  FaFile,
  FaPaperclip,
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
          <div className="bg-dark-grey ph3 pv4 w-100 mv4">
            <img
              className="mw6 mla mra ph4 ph5-md"
              src={imageBuilder.image(value?.node?.asset).auto('format').url()}
            />
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

export default function CarouselItemSection({ message, backButton }) {
  console.log('message', message);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonIconArrowLeft = <IconArrowLeft color="white" size={16} />;
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
          <div className="col-12 flex justify-end pb1">
            {message?.attachments?.length && (
              <Button
                type="secondary"
                size="small"
                text="Access attachments"
                color="white"
                fluid={false}
                icon={message.attachments?.map((attachment, index) =>
                  getIconByMimeType(attachment.mimeType)
                )}
                iconFloat="right"
                inverted={true}
                loading={false}
                disabled={!message.attachments?.length}
                skeleton={false}
                onClick={toggleModal}
                withLinkProps={null}
              />
            )}
          </div>
        </div>
      </div>

      <div className="col-24 col-12-md mla mra">
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
            <p className="pb3">
              This message features {message.attachments.length} exclusive
              Dominion attachments:
            </p>
            <ul className="ls-none">
              {message.attachments.map((attachment, index) => (
                <li className="pv2" key={index}>
                  {attachment.file ? (
                    <a
                      href={`${attachment.file}?dl=`}
                      className="white align-center pb1 bb bc-white dif"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="pr2">
                        {getIconByMimeType(attachment.mimeType)}
                      </span>
                      {attachment.title}
                    </a>
                  ) : (
                    <a
                      href={attachment.url}
                      className="white align-center pb1 bb bc-white dif"
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
        </Modal>
      )}
    </section>
  );
}
