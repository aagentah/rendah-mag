import Link from 'next/link';
import { useState } from 'react';

import {
  Modal,
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';

export default function HeroCypher({ cypher }) {
  const [modalActive, setModalActive] = useState(false);

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  const heroImage = (
    <Image
      /* Options */
      src="/images/cypher-youtube.jpg"
      placeholder={null}
      alt="This is the alt text."
      figcaption={null}
      height={500}
      width={null}
      customClass={null}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroHeading = (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="Rendah Mag Cyphers"
      color="white"
      size="x-large"
      truncate={null}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroButton = (
    <Button
      /* Options */
      type="secondary"
      size="medium"
      text="Enter this month's Cypher"
      color="white"
      fluid={false}
      icon={buttonIcon}
      iconFloat={null}
      inverted={false}
      loading={false}
      disabled={false}
      onClick={() => setModalActive(!modalActive)}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <>
      <Modal
        /* Options */
        size="small"
        active={modalActive}
      >
        <div className="pb2">
          <Heading
            /* Options */
            htmlEntity="h3"
            text="Login or Sign up to enter this month's Cypher!"
            color="black"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="flex  flex-wrap  pb2">
          <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center">
            <Button
              /* Options */
              type="primary"
              size="medium"
              text="Login"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              onClick={null}
              /* Children */
              withLinkProps={{
                type: 'next',
                href: '/login',
                target: null,
                routerLink: Link,
                routerLinkProps: null,
              }}
            />
          </div>
          <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center">
            <Button
              /* Options */
              type="primary"
              size="medium"
              text="Sign Up"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              onClick={null}
              /* Children */
              withLinkProps={{
                type: 'next',
                href: '/signup',
                target: null,
                routerLink: Link,
                routerLinkProps: null,
              }}
            />
          </div>
          <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center  pl2">
            <Button
              /* Options */
              type="secondary"
              size="medium"
              text="Cancel"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              onClick={() => {
                setModalActive(!modalActive);
              }}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </div>
      </Modal>

      <div className="hero--cypher  hero--darken-all">
        <Hero
          /* Options */
          height={500}
          /* Children */
          image={heroImage}
          title={heroHeading}
          description={null}
          button={cypher ? heroButton : null}
        />
      </div>
    </>
  );
}
