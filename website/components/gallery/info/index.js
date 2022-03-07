import { Parallax } from 'react-scroll-parallax';
import BlockContent from '@sanity/block-content-to-react';

import { Heading, Image, Button, Icon } from 'next-pattern-library';

import Container from '~/components/layout/container';

import { useApp } from '~/context-provider/app';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

export default function Intro({ post }) {
  const app = useApp();

  if (app?.deviceSize) {
    return (
      <Parallax speed={-20} disabled={app.deviceSize === 'md'}>
        <Container>
          <div className="flex  flex-wrap  mb4  mb6-md  pt6  pt0-md">
            <div className="col-24  flex  flex-wrap  justify-center">
              <h1 className="t-primary  mb4  tac">{post?.title}</h1>
            </div>

            <div className="col-24  flex  flex-wrap  justify-center  pb3">
              <div className="measure-wide  mla  mra  tac">
                <BlockContent
                  blocks={post.introduction}
                  serializers={SANITY_BLOCK_SERIALIZERS}
                />
              </div>
            </div>
          </div>
        </Container>
      </Parallax>
    );
  }
}
