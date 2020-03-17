/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rendah-pattern-library';

export class Link extends PureComponent {
  render() {
    const withLinkProps = {
      type: 'external',
      url: this.props.url,
      target: '_blank',
      routerLink: null,
    };

    return (
      <div className="pv3  tal">
        <div className="col-24">
          <Button
            /* Options */
            type={'primary'}
            size={'small'}
            text={this.props.text}
            color={'black'}
            fluid={false}
            icon={null}
            iconFloat={null}
            inverted
            loading={false}
            disabled={false}
            onClick={null}
            /* Children */
            withLinkProps={withLinkProps}
          />
        </div>
      </div>
    );
  }
}

Link.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

Link.defaultProps = {
  text: '',
  url: '',
};

export default Link;
