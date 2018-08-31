/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

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
        <Helmet title={this.props.match.params.id.replace(/\s+/g, '-')} />
        <h1 className="dn">{this.props.match.params.id.replace(/\s+/g, '-')}</h1>
        <AuthorInfo padding="pt4  pb5" match={this.props.match} seo />
        <p className="t-title  bold  tac  f6  ttu  pt2  pb3">LATEST FROM {this.props.match.params.id.split('-')[0]}</p>
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
