/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Label, Heading } from 'rendah-pattern-library';

import { convertDate } from '../../../functions';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding, column, invert } = this.props;

    const textColour = invert ? 'white' : 'black';

    const renderCard = (article) => {
      const withLinkProps = {
        type: 'internal',
        url: `/article/${article.slug}`,
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
          height={75}
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
          truncate={2}
          reveal={null}
          /* Children */
          withLinkProps={withLinkProps}
        />
      );

      return (
        <Card
          /* Options */
          type={'thumbnail'}
          onClick={null}
          /* Children */
          image={cardImage}
          labelBlock={[dateLabel]}
          title={cardHeading}
          description={null}
          button={null}
        />
      );
    };

    return (
      <div className={`container-medium  center  ${padding}`}>
        <div className="flex  flex-wrap">
          {list.map(article => (
            <div key={article.title} className={`${(column || 'col-24')}  ph3  pb2`}>
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
  column: PropTypes.string,
  invert: PropTypes.bool,
};

ArticleListGrid.defaultProps = {
  list: [],
  padding: '',
  column: 'col-24',
  invert: false,
};

export default ArticleListGrid;
