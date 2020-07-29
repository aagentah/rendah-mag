import { useState } from 'react';

import { Parallax } from 'react-scroll-parallax';

import {
  Modal,
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';

import { imageBuilder } from '../../../lib/sanity/requests';

export default function HeroCypher({ cypher }) {
  const [modalActive, setModalActive] = useState(false);

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  const heroImage = (
    <Image
      /* Options */
      src={imageBuilder.image(cypher.image).height(700).width(1080).url()}
      placeholder={imageBuilder.image(cypher.image).height(50).width(108).url()}
      alt="This is the alt text."
      figcaption={null}
      height={500}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroHeading = (
    <Heading
      /* Options */
      htmlEntity="h1"
      text={cypher.title}
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
      type="primary"
      size="medium"
      text="Enter this month's Cypher"
      color="black"
      fluid={false}
      icon={buttonIcon}
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
        <div className="pb3">
          <Copy
            /* Options */
            text="This is the point of no return. Are you sure you want to DELETE your account?"
            color="black"
            size="medium"
            truncate={2}
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
              withLinkProps={null}
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
              withLinkProps={null}
            />
          </div>
          <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center">
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

      <Parallax className="z1  nt4" y={['-110px', '100px']} tagOuter="figure">
        <div className="hero--cypher  hero--darken-all">
          <Hero
            /* Options */
            height={500}
            /* Children */
            image={heroImage}
            title={heroHeading}
            description={null}
            button={heroButton}
          />
        </div>
      </Parallax>
    </>
  );
}
