import { useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import dynamic from 'next/dynamic';
import { saveAs } from 'file-saver';
import Link from 'next/link';

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
          <div className="ph4 ph5-md w-100 mv4 pv3-md br3">
            <div className="w-100 mla mra mw6">
              <ImageNew
                imageObject={value?.node?.imageObject}
                objectFit="contain"
                className="shadow2 br3"
              />
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

  const buttonIconArrowLeft = <IconArrowLeft color="rendah-red" size={16} />;
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
    <section className="pb4 pb6-md ph4 ph0-md">
      <div className="ph5-md">
        <div className="pt4 pb5">
          <div className="col-24 col-12-md mla mra">
            <div className="col-12 pb1">
              <Button
                /* Options */
                type="secondary"
                size="small"
                text="Back"
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
                  href: '/profile',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: {
                    as: `/profile`,
                    scroll: false,
                  },
                }}
              />
            </div>

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
        </div>
      </div>
    </section>
  );
}
