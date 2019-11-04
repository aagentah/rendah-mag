/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Label, Heading, Copy } from 'rendah-pattern-library';

// import { convertDate } from '../../../functions';

export class Item extends PureComponent {
  // date = date => convertDate(date);

  render() {
    const { teamMember } = this.props;
    // const { alias, role, order } = teamMember;

    const renderCard = () => {
      const withLinkProps = {
        type: 'internal',
        url: `/team/${teamMember.slug}`,
        target: '_top',
        routerLink: Link,
      };

      const cardImage = (
        <Image
          /* Options */
          src={teamMember.img}
          placeholder={`${teamMember.img}?w=100`}
          alt={teamMember.name}
          figcaption={null}
          height={150}
          onClick={null}
          /* Children */
          withLinkProps={withLinkProps}
        />
      );

      const aliasLabel = (
        <Label
          /* Options */
          type={'text'}
          text={teamMember.alias}
          color={'black'}
          backgroundColor={'white'}
          onClick={null}
          /* Children */
          withLinkProps={null}
        />
      );

      const cardHeading = (
        <Heading
          /* Options */
          htmlEntity={'h2'}
          text={teamMember.name}
          color={'black'}
          size={'small'}
          truncate={1}
          /* Children */
          withLinkProps={withLinkProps}
        />
      );

      const cardCopy = (
        <Copy
          /* Options */
          text={teamMember.description}
          color={'black'}
          size={'medium'}
          truncate={2}
          /* Children */
          withLinkProps={null}
        />
      );

      return (
        <Card
          /* Options */
          type={'block'}
          onClick={null}
          /* Children */
          image={cardImage}
          labelBlock={[aliasLabel]}
          title={cardHeading}
          description={cardCopy}
          button={null}
        />
      );
    };

    return (
      <div className="col-12  col-6-sm  col-4-md  pa3">
        {renderCard()}
      </div>
    );
  }
}

// Item.propTypes = {
//   list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
//   padding: PropTypes.string,
// };
//
// Item.defaultProps = {
//   list: [],
//   padding: '',
// };

export default Item;
