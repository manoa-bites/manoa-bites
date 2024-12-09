'use client';

import { prisma } from '@/lib/prisma';
import React, { useState } from 'react';
import { Restaurant } from '@prisma/client';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import RestaurantCard from './RestaurantCard';

const SearchRestaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [results, setResults] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const getSortParams = (): Record<string, 'asc' | 'desc'> => {
    console.log('Sort Params:', sortOption);
    switch (sortOption) {
      case 'name-asc':
        return { name: 'asc' };
      case 'location-asc':
        return { locationId: 'asc' };
      default:
        return {};
    }
  };

  const handleSearch = async () => {
    console.log('Handle search clicked');
    setLoading(true);
    try {
      const fetchedResults = await prisma.restaurant.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        orderBy: getSortParams(),
      });

      console.log('Fetched Results:', fetchedResults);

      setResults(fetchedResults);
    } catch (error) {
      console.error('Error while fetching restaurants', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Row className="align-items-center">
              {/* Search Input */}
              <Col xs={7} md={8} className="text-start">
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Search for a restaurant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              {/* Search Button */}
              <Col xs={3} md={2} className="text-md-end">
                <Button className="mt-2" onClick={handleSearch}>
                  Search
                </Button>
              </Col>
              {/* Sort Dropdown */}
              <Col xs={2} md={2} className="text-md-start">
                <Form.Select
                  className="mt-2"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="location-asc">Location (Ascending)</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {loading && <div className="text-center">Loading...</div>}
      {results.length > 0 ? (
        results.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))
      ) : (
        !loading && <div className="text-center">No restaurants found</div>
      )}
    </>
  );
};

export default SearchRestaurants;
