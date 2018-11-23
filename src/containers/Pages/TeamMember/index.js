/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import TeamMemberInfo from '../../../containers/Fragments/TeamMemberInfo';
import TeamMemberArticles from '../../../containers/Fragments/TeamMemberArticles';


export class TeamMember extends PureComponent {
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
        <TeamMemberInfo padding="pt4  pb5" match={this.props.match} seo />
        <p className="t-title  bold  tac  f6  ttu  pt2  pb3">LATEST FROM {this.props.match.params.id.split('-')[0]}</p>
        <TeamMemberArticles match={this.props.match} />
      </main>
    );
  }
}

TeamMember.propTypes = {
  match: PropTypes.shape(),
};

TeamMember.defaultProps = {
  match: [],
};

export default TeamMember;
