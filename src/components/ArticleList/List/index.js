/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Label, Heading } from 'rendah-pattern-library';

import { convertDate } from '../../../functions';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding } = this.props;

    const renderCard = (article) => {
      console.log('article', article);

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

      return (
        <Card
          /* Options */
          type={'thumbnail'}
          price={this.date(article.created)}
          discountPrice={null}
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

    console.log('list', list);

    return (
      <div className={`container-medium  center  ${padding}`}>
        <div className="flex  flex-wrap">
          {list.map(article => (
            <div key={article.title} className="col-24">
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
