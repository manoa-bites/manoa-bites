'use client';

import React from 'react';
// import { Container } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  // const [activeButton, setActiveButton] = useState<string>('');

  // const handleButtonClick = (buttonName: string) => {
  //   setActiveButton(buttonName === activeButton ? '' : buttonName);
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="filterDiv">
      <div
        style={{
          width: '100%',
        }}
      >
        <div className="searchBar px-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
            className="searchBarInput"
          />
          <Search
            style={{
              position: 'absolute',
              right: '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666',
            }}
            size={20}
          />
        </div>
        <div className="btnContainer" />
        {/* <button
            type="button"
            className={`filterBtn ${activeButton === 'Requested' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Requested')}
          >
            Requested
          </button>
          <button
            type="button"
            className={`filterBtn ${activeButton === 'Accepted' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Accepted')}
          >
            Accepted
          </button> */}
        {/* </Container> */}
      </div>
    </div>
  );
};

export default SearchBar;
