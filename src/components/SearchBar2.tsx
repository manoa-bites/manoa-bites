'use client';

import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import RestaurantCard from './RestaurantCard';
import { Restaurant } from '@prisma/client';

type SearchRestaurantsProps = {
  initialRestaurants: Restaurant[];
};

const SearchRestaurants: React.FC<SearchRestaurantsProps> = ({ initialRestaurants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [results, setResults] = useState(initialRestaurants);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    const filteredResults = initialRestaurants
      .filter((restaurant) => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()));

    switch (sortOption) {
      case 'location-asc':
        filteredResults.sort((a, b) => a.locationId - b.locationId);
        break;
      case 'name-asc':
        filteredResults.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredResults.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setResults(filteredResults);
    setLoading(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSortOption('');
    setResults(initialRestaurants);
  };

  return (
    <>
      <Container fluid className="my-4">
        {/* Centered Search Controls */}
        <Row className="justify-content-center mb-3 align-items-center">
          {/* Search Input (Longer) */}
          <Col xs={6} md={4} className="text-start">
            <Form.Control
              type="text"
              placeholder="Search for a restaurant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          {/* Sort Dropdown */}
          <Col xs={6} md={2} className="text-center">
            <Form.Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="location-asc">Location ID (Ascending)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </Form.Select>
          </Col>
          {/* Search Button */}
          <Col xs={6} md={2} lg={1} className="text-center">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          {/* Clear Filters Button */}
          <Col xs="auto" className="text-center">
            <Button
              variant="secondary"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Container>
      {loading && <div className="text-center">Loading...</div>}
      <Row xs={1} md={3} className="g-4">
        {results.length > 0 ? (
          results.map((restaurant) => (
            <Col key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} />
            </Col>
          ))
        ) : (
          !loading && <div className="text-center">No restaurants found</div>
        )}
      </Row>
    </>
  );
};

export default SearchRestaurants;
