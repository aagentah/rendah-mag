/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Card, Image, Label, Heading, Copy } from 'rendah-pattern-library';

import { convertDate } from '../../../functions';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding, invert } = this.props;

    const textColour = invert ? 'white' : 'black';

    const renderCard = (article) => {
      const articleWithLinkProps = {
        type: 'internal',
        url: `/studio/${article.slug}`,
        target: null,
        routerLink: Redirect,
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

      const cardHeading = (
        <Heading
          /* Options */
          htmlEntity={'h2'}
          text={article.title}
          color={textColour}
          size={'small'}
          truncate={null}
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
          labelBlock={[dateLabel]}
          title={cardHeading}
          description={cardCopy}
          button={null}
        />
      );
    };

    return (
      <React.Fragment>
        {list.map(article => (
          <div key={article.title} className={`col-24  col-6-sm  ${padding}`}>
            {renderCard(article)}
          </div>
        ))}
      </React.Fragment>
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
