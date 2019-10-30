/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Label, Heading, Copy } from 'rendah-pattern-library';

import { convertDate } from '../../../functions';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding } = this.props;

    const renderCard = (article) => {
      const withLinkProps = {
        type: 'internal',
        url: `/article/${article.slug}`,
        target: '_top',
      };

      const cardImage = (
        <Image
          /* Options */
          src={article.img}
          placeholder={`${article.img}?w=100`}
          alt={article.title}
          figcaption={null}
          height={250}
          onClick={null}
          /* Children */
          withLinkProps={withLinkProps}
        />
      );

      const dateLabel = (
        <Label
          /* Options */
          type={'date'}
          text={this.date(article.created)}
          color={'black'}
          backgroundColor={'white'}
          onClick={null}
          /* Children */
          withLinkProps={null}
        />
      );

      const authorLabel = (
        <Label
          /* Options */
          type={'author'}
          text={article.teamMember}
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
          text={article.title}
          color={'black'}
          size={'small'}
          truncate={2}
          /* Children */
          withLinkProps={withLinkProps}
        />
      );

      const cardCopy = (
        <Copy
          /* Options */
          text={article.description}
          color={'black'}
          size={'medium'}
          truncate={2}
        />
      );

      return (
        <Card
          /* Options */
          type={'block'}
          onClick={null}
          /* Children */
          image={cardImage}
          labelBlock={[dateLabel, authorLabel]}
          title={cardHeading}
          description={cardCopy}
          button={null}
        />
      );
    };

    return (
      <div className={`container-medium  center  ${padding}`}>
        <div className="flex  flex-wrap">
          {list.map(article => (
            <div key={article.title} className="col-24  col-6-sm  pa3">
              {renderCard(article)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ArticleListGrid.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  padding: PropTypes.string,
};

ArticleListGrid.defaultProps = {
  list: [],
  padding: '',
};

export default ArticleListGrid;
