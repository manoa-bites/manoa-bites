'use client';

import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { Restaurant } from '@prisma/client';
import RestaurantCard from './RestaurantCard';

type RestaurantWithLocationName = Restaurant & {
  locationName:string | null
};

type SearchRestaurantsProps = {
  initialRestaurants: RestaurantWithLocationName[];
};

// Mapping of location IDs to location names
const locationNames: Record<number | string, string> = {
  1: 'Palms Food Court',
  2: 'Campus Center',
  3: 'Engineering Courtyard',
  Unknown: 'Unknown Location', // Fallback for null or undefined
};

const SearchRestaurants: React.FC<SearchRestaurantsProps> = ({ initialRestaurants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [results, setResults] = useState(initialRestaurants);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    const filteredResults = initialRestaurants.filter(
      (restaurant) => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    switch (sortOption) {
      case 'location-asc':
        filteredResults.sort((a, b) => (a.locationId || 0) - (b.locationId || 0));
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

  const groupedResultsByLocation = () => results.reduce((acc, restaurant) => {
    const locationId = restaurant.locationId ?? 'Unknown'; // Handle null or undefined
    if (!acc[locationId]) acc[locationId] = [];
    acc[locationId].push(restaurant);
    return acc;
  }, {} as Record<string, RestaurantWithLocationName[]>);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSortOption('');
    setResults(initialRestaurants);
  };

  return (
    <>
      <Container fluid className="my-4">
        <Row className="justify-content-center mb-3 align-items-center">
          <Col xs={6} md={4} className="text-start">
            <Form.Control
              type="text"
              placeholder="Search for a restaurant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={6} md={2} className="text-center">
            <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Sort By</option>
              <option value="location-asc">Location ID (Ascending)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </Form.Select>
          </Col>
          <Col xs={6} md={2} lg={1} className="text-center">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          <Col xs="auto" className="text-center">
            <Button variant="secondary" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Container>
      {loading && <div className="text-center">Loading...</div>}
      {sortOption === 'location-asc' ? (
        <Container>
          {Object.entries(groupedResultsByLocation()).map(([locationId, restaurants]) => (
            <Container key={locationId}>
              <h5>
                Location:
                {' '}
                {locationNames[locationId] || locationId}
              </h5>
              <Row xs={1} md={3} className="g-4 mt-1">
                {restaurants.map((restaurant) => (
                  <Col key={restaurant.id}>
                    <RestaurantCard restaurant={restaurant} />
                  </Col>
                ))}
              </Row>
            </Container>
          ))}
        </Container>
      ) : (
        <Row xs={1} md={3} className="g-4 mt-1">
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
      )}
    </>
  );
};

export default SearchRestaurants;
