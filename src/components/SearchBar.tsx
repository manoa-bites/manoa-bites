'use client';

import React from 'react';
import { Button } from 'react-bootstrap';

const SearchBar = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('search') || '';

  const [query, setQuery] = React.useState(initialQuery);

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for restaurants..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
