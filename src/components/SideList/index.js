/* eslint-disable import/no-named-as-default, react/prop-types */

import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export class SideList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false,
      redirectVal: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      fireRedirect: true,
      redirectVal: event.target.value,
      value: event.target.value,
    });
  };

  redir = () => {
    this.setState({
      value: this.props.location.pathname,
    });

    const { from } = this.props.location.pathname || '/';
    if (this.state.fireRedirect) {
      this.setState({ fireRedirect: false });
      return <Redirect push to={from || this.state.redirectVal} />;
    }
    return false;
  };

  render() {
    const { list, padding } = this.props;

    return (
      <React.Fragment>
        <ul className={`${padding}  list-none  dn  db-md`}>
          {list.map(item => (
            <li key={item.title} className="col-24  col-12-sm  col-24-lg  pv2  mb2  bb  bc-black">
              <Link title={item.slug} to={`/store/${item.slug}`} className="t-body  db  link">
                <p className="t-title  black  f6  cp  over-hidden  link  list-card__title">
                  {item.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <select
          className={`${padding}  list-none  db  dn-md  ba  bc-light-grey  t-body  f5  pa2  shadow2  br3  mt2  mb3  w-100`}
          onChange={this.handleChange}
        >
          <option value="" disabled selected>
            {this.props.name}
          </option>

          {list.map(item => (
            <option key={item.title} value={`/store/${item.slug}`}>
              {item.title}
            </option>
          ))}
        </select>

        {this.redir()}
      </React.Fragment>
    );
  }
}

SideList.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  padding: PropTypes.string,
};

SideList.defaultProps = {
  list: [],
  padding: '',
};

export default SideList;
