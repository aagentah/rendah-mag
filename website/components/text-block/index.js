import BlockContent from '@sanity/block-content-to-react';

import Container from '../layout/container';
import componentTextAlign from '~/functions/componentTextAlign';
import componentSpacing from '~/functions/componentSpacing';

export default function TextBlock({ component }) {
  const {
    backgroundColour,
    textColour,
    textAlign,
    padding,
    margin,
    content,
  } = component;

  const textAlignClass = componentTextAlign(textAlign);
  const paddingClass = componentSpacing('padding', padding);
  const marginClass = componentSpacing('margin', margin);

  return (
    <div
      className={`text-block  bg-${backgroundColour} ${textColour} ${textAlignClass} ${paddingClass} ${marginClass}`}
    >
      <Container>
        <BlockContent blocks={content} />
      </Container>
    </div>
  );
}
