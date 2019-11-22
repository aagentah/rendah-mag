/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Label, Heading, Copy } from 'rendah-pattern-library';
import trim from 'lodash/trim';

import { convertDate, toUrlCase } from '../../../functions';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding, invert } = this.props;

    const textColour = invert ? 'white' : 'black';

    const renderCard = (article) => {
      const articleWithLinkProps = {
        type: 'internal',
        url: `/article/${article.slug}`,
        target: '_top',
        routerLink: Link,
      };

      const authorWithLinkProps = {
        type: 'internal',
        url: `/team/${toUrlCase(trim(article.teamMember))}`,
        target: '_top',
        routerLink: Link,
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
          withLinkProps={articleWithLinkProps}
        />
      );

      const dateLabel = (
        <Label
          /* Options */
          type={'date'}
          text={this.date(article.created)}
          color={textColour}
          backgroundColor={null}
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
          color={textColour}
          backgroundColor={null}
          onClick={null}
          /* Children */
          withLinkProps={authorWithLinkProps}
        />
      );

      const cardHeading = (
        <Heading
          /* Options */
          htmlEntity={'h2'}
          text={article.title}
          color={textColour}
          size={'small'}
          truncate={2}
          reveal={null}
          /* Children */
          withLinkProps={articleWithLinkProps}
        />
      );

      const cardCopy = (
        <Copy
          /* Options */
          text={article.description}
          color={textColour}
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
            <div key={article.title} className="col-24  col-6-sm  ph3  pb2">
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
  invert: PropTypes.bool,
};

ArticleListGrid.defaultProps = {
  list: [],
  padding: '',
  invert: false,
};

export default ArticleListGrid;
