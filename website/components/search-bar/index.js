import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Router from 'next/router';

const SearchBar = forwardRef((props, ref) => {
  const inputEl = useRef(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputEl.current.focus();
    },
  }));

  const handleSearch = (e) => {
    e.preventDefault();
    Router.push(`/search/${inputEl.current.value}`);
  };

  return (
    <form
      noValidate
      className="search-bar__wrapper"
      onSubmit={handleSearch}
      role="search"
    >
      <div className="flex flex-wrap">
        <label htmlFor="search-input" className="dn">
          Search
        </label>
        <input
          id="search-input"
          className="search-bar__input di"
          placeholder="Search..."
          ref={inputEl}
          type="text"
          aria-label="Search"
        />
      </div>
    </form>
  );
});

export default SearchBar;
