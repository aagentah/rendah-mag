/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import startCase from 'lodash/startCase';
import { Heading, Copy } from 'rendah-pattern-library';

import CategoryArticles from '../../../../containers/Fragments/Blog/CategoryArticles';

export class Category extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = startCase(this.props.match.params.query);
    const canonical = `https://www.rendahmag.com/category/${this.props.match.params.query}`;
    let description = null;

    switch (title) {
      case 'News':
        description = 'Bringing you the latest news within the scene.';
        break;
      case 'Interviews':
        description = 'Read exclusive interviews with established & upcoming artists.';
        break;
      case 'Insights':
        description = 'Explicit reviews & insights to some of our favourite releases.';
        break;
      default:
        description = null;
    }

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <div className="container-medium  mla  mra  pt4  mv3">
          <div className="flex  pb2  ph3">
            <Heading
              /* Options */
              htmlEntity={'h1'}
              text={title}
              color={'black'}
              size={'x-large'}
              truncate={null}
              reveal
            />
          </div>
          <div className="flex  pb2  ph3">
            <Copy
              /* Options */
              text={description}
              color={'black'}
              size={'medium'}
              truncate={1}
            />
          </div>
        </div>

        <div className="container-medium  center  pv2">
          <div className="flex  flex-wrap">
            <CategoryArticles match={this.props.match} range={[1, 24]} type="grid" padding="ph3  pb2" />
          </div>
        </div>
      </main>
    );
  }
}

Category.propTypes = {
  match: PropTypes.shape(),
};

Category.defaultProps = {
  match: [],
};

export default Category;
