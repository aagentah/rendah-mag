/* eslint-disable import/no-named-as-default, react/no-array-index-key */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AuthorInfo from '../../../containers/Fragments/AuthorInfo';
import AuthorArticles from '../../../containers/Fragments/AuthorArticles';


export class Author extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <AuthorInfo match={this.props.match} />
        <p className="tac  mb2  mt3">Latest from {this.props.match.params.id.split('-')[0]}</p>
        <AuthorArticles match={this.props.match} />
      </main>
    );
  }
}

Author.propTypes = {
  match: PropTypes.shape(),
};

Author.defaultProps = {
  match: [],
};

export default Author;
