import { Parallax } from 'react-scroll-parallax';

import { Heading, Image, Button, Icon } from 'next-pattern-library';

import Container from '~/components/layout/container';

import { useApp } from '~/context-provider/app';

export default function Intro({}) {
  const app = useApp();

  return (
    <Parallax speed={-20} disabled={app.deviceSize === 'md'}>
      <Container>
        <div className="flex  flex-wrap  mb6">
          <div className="col-24  flex  flex-wrap  justify-center">
            <h1 className="t-primary  mb4  tac">Lorem ipsum dolor sit amet</h1>
          </div>

          <div className="col-24  flex  flex-wrap  justify-center  pb4">
            <p className="measure-wide  tac">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation. eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation.
            </p>
          </div>

          <div className="col-24  flex  flex-wrap  justify-center">
            <Icon
              className="light-grey"
              icon={['fas', 'arrow-down']}
              size="2x"
            />
          </div>
        </div>
      </Container>
    </Parallax>
  );
}
