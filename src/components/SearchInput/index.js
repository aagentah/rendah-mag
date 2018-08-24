/* eslint-disable import/no-named-as-default, arrow-body-style,
jsx-a11y/no-static-element-interactions */

import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ArrowRight } from '../Elements/Svg';


export class SearchInput extends PureComponent {
  constructor() {
    super();
    this.state = {
      fireRedirect: false,
      inputValue: '',
      placeholder: 'SEARCH',
    };
  }

  updateInputValue = (evt) => {
    this.setState({ inputValue: evt.target.value });
  }

  submitForm = (e) => {
    e.preventDefault();
    this.setState({ fireRedirect: true });
  }

  redir = () => {
    const { from } = this.props.location.state || '/';
    if (this.state.fireRedirect) {
      this.setState({ fireRedirect: false });
      if (this.state.inputValue) {
        this.setState({ placeholder: 'SEARCH' });
        this.setState({ inputValue: '' });
        this.props.onSearch();
        return <Redirect push to={from || `/search/${this.state.inputValue}`} />;
      }
      this.setState({ placeholder: 'SEARCH' });
      return false;
    }
    return false;
  }

  render() {
    return (
      <div className="searchInput">
        <form className="searchInput__form" action="#" onSubmit={this.submitForm}>
          <input className={`ttu  dark-grey  ph2  t7-lg  t8  ${this.props.textAlign}  searchInput__input`} type="search" placeholder={this.state.placeholder} value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
          <button className="searchInput__submit  cp" tyle="submit"><ArrowRight /></button>
        </form>
        {this.redir()}
      </div>
    );
  }
}

SearchInput.propTypes = {
  location: PropTypes.shape(),
  textAlign: PropTypes.string,
  onSearch: PropTypes.func,
};

SearchInput.defaultProps = {
  location: {},
  textAlign: '',
  onSearch: () => { return false; },
};

export default SearchInput;
