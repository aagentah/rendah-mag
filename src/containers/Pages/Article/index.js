/* eslint-disable import/no-named-as-default, react/no-array-index-key */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FacebookProvider, { Comments } from 'react-facebook';
import Helmet from 'react-helmet';

import ArticleInfo from '../../../containers/Fragments/ArticleInfo';
import ExtraArticles from '../../../containers/Fragments/ExtraArticles';


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
        <Helmet>
          {/* Twitter  */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@RendahMag" />

          {/* Open Graph data */}
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="Rendah" />
          <meta property="article:section" content="article" />
        </Helmet>

        <ArticleInfo match={this.props.match} />
        <div className="container  tac">
          <div className="row  rel">
            <div className="facebook-comments-padding--top" />
            <div className="col-md-16  col-md-offset-4  facebook-comments">
              <FacebookProvider appId="154881868603516">
                <Comments href={`http://www.rendahmag.com${this.props.match.url}`} numPosts={3} width="100%" />
              </FacebookProvider>
            </div>
            <div className="facebook-comments-padding--bottom" />
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
