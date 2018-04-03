/* eslint-disable import/no-named-as-default, react/no-array-index-key */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FacebookProvider, { Comments } from 'react-facebook';

import ArticleInfo from '../../../containers/Fragments/ArticleInfo';
import ExtraArticles from '../../../containers/Fragments/ExtraArticles';

// Export this for unit testing more easily
export class Article extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <ArticleInfo match={this.props.match} />
        <div className="container  tac">
          <div className="row">
            <div className="col-md-16 col-md-offset-4">
              <FacebookProvider appId="154881868603516">
                <Comments href="http://www.facebook.com" numPosts={3} width="100%" />
              </FacebookProvider>
            </div>
          </div>
        </div>
        <h2 className="tac  mb4">More articles</h2>
        <ExtraArticles />
      </main>
    );
  }
}

Article.propTypes = {
  match: PropTypes.shape(),
};

Article.defaultProps = {
  match: [],
};

export default Article;
