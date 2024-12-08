'use client';

// Ensure this is a client-side component

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import SearchResults from './SearchServer';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const handleSearch = () => {
    setSubmittedQuery(query);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search restaurants..."
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '8px',
          }}
        />
        <Button
          onClick={handleSearch}
          style={{
            padding: '10px 16px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </Button>
      </div>

      {/* Render server-side results */}
      {submittedQuery && <SearchResults query={submittedQuery} />}
    </div>
  );
};

export default SearchBar;
