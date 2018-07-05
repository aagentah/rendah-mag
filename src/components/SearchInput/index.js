/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


export class SearchInput extends PureComponent {
  constructor() {
    super();
    this.state = {
      fireRedirect: false,
      inputValue: '',
      placeholder: 'SEARCH SITE',
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
        this.setState({ placeholder: 'SEARCH SITE' });
        this.setState({ inputValue: '' });
        return <Redirect push to={from || `/search/${this.state.inputValue}`} />;
      }
      this.setState({ placeholder: 'SEARCH SITE' });
      return false;
    }
    return false;
  }

  render() {
    return (
      <div className="searchInput">
        <form className="searchInput__form" action="#" onSubmit={this.submitForm}>
          <button className="searchInput__submit  cp" tyle="submit"><img className="di  searchInput__search-icon" width="50" src={require('../../containers/App/assets/search.png')} alt="Logo" role="presentation" /></button>
          <input className={`ph2  ${this.props.textAlign}  searchInput__input`} type="search" placeholder={this.state.placeholder} value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
        </form>
        {this.redir()}
      </div>
    );
  }
}

SearchInput.propTypes = {
  location: PropTypes.shape(),
  textAlign: PropTypes.string,
};

SearchInput.defaultProps = {
  location: {},
  textAlign: '',
};

export default SearchInput;
