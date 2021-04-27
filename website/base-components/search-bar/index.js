import React, { useRef } from 'react';
import Router from 'next/router';

export default function SearchBar() {
  const inputEl = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    Router.push(`/search/${inputEl.current.value}`);
  };

  return (
    <form className="search-bar__wrapper" onSubmit={handleSearch}>
      <div className="flex  flex-wrap">
        <input
          className="search-bar__input  di"
          placeholder="Search..."
          ref={inputEl}
          type="text"
        />
      </div>
    </form>
  );
}
