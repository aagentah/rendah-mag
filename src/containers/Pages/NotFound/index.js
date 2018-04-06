/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import SearchInput from '../../../components/SearchInput';
import CategoryGrid from '../../../components/CategoryGrid';

export class NotFound extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <Helmet title="You got 404" />
        <p className="tac  black  title-font  t5  pt5  pt4-sm  pv4  pb3-sm">You just got 404&#39;d, this page does not exist.</p>
        <p className="pt4  t6  fw6  black  tac  title-font">Search the site for something else?</p>
        <div className="pt1  pb2"><SearchInput textAlign="tac" /></div>
        <CategoryGrid />
      </main>
    );
  }
}

export default NotFound;
