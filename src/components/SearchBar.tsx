'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';

const SearchBar = ({ initialResults }: { initialResults: any[] }) => {
  const [results, setResults] = useState(initialResults);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim().length > 0) {
      // eslint-disable-next-line max-len
      const filteredResults = initialResults.filter((restaurant) => restaurant.name.toLowerCase().includes(query.toLowerCase()));
      setResults(filteredResults);
    } else {
      setResults(initialResults); // Reset to initial results if the query is empty
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search restaurants..."
          className="search-input"
          style={{ padding: '8px', flex: 1, marginRight: '8px' }}
        />
        <Button onClick={handleSearch} className="search-button" style={{ padding: '8px 16px' }}>
          Search
        </Button>
      </div>

      <ul>
        {results.length > 0 ? (
          results.map((restaurant) => <li key={restaurant.id}>{restaurant.name}</li>)
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
