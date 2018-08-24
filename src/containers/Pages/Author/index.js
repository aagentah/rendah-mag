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
        <AuthorInfo match={this.props.match} seo />
        <div className="mt4">
          <p className="tac  dark-grey  t6  ttu  t-title-bold  pv2  mb3  mt3  ttu">LATEST FROM {this.props.match.params.id.split('-')[0]}</p>
        </div>
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
