/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import AuthorsFragment from '../../../containers/Fragments/Authors';

export class Authors extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <Helmet title="Authors" />
        <h1>Authors</h1>
        <AuthorsFragment />
      </main>
    );
  }
}

export default Authors;
