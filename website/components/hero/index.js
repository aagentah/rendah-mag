import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

export default function Hero() {
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  const heroImage = (
    <Image
      /* Options */
      src="https://images.unsplash.com/photo-1555086156-e6c7353d283f"
      placeholder="https://via.placeholder.com/500x500"
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
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
      text="Read more"
      color="white"
      fluid={false}
      icon={buttonIcon}
      iconFloat={null}
      inverted={false}
      loading={false}
      disabled={false}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <Parallax className="z1  nt4" y={['-110px', '100px']} tagOuter="figure">
      <Hero
        /* Options */
        height={500}
        /* Children */
        image={heroImage}
        title={heroHeading}
        description={null}
        button={heroButton}
      />
    </Parallax>
  );
}
