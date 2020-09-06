// import BlockContent from '@sanity/block-content-to-react';

import TextBlock from '~/components/text-block';

export default function RenderComponents({ component }) {
  switch (component._type) {
    case 'textBlock':
      return <TextBlock component={component} />;
    default:
      return false;
  }
}
