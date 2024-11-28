'use client';

import { useState } from 'react';

const SearchBar = ({ initialResults }: { initialResults: any[] }) => {
  const [results, setResults] = useState(initialResults);
  const [query, setQuery] = useState('');

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    if (value.length > 2) {
      // eslint-disable-next-line max-len
      const filteredResults = initialResults.filter((restaurant) => restaurant.name.toLowerCase().includes(value.toLowerCase()));
      setResults(filteredResults);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search restaurants..."
        className="search-input"
      />
      <ul>
        {results.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
