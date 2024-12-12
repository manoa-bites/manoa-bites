'use client';

import { useMemo, useState, useEffect, ReactElement } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Col, Container, Row } from 'react-bootstrap';

type Location = {
  id: number;
  lat: number;
  lng: number;
  name: string;
};

function Map(): ReactElement {
  const center = useMemo(() => ({ lat: 21.29865113996328, lng: -157.8170814659863 }), []);
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [showAllLocations, setShowAllLocations] = useState(true);
  const [zoom, setZoom] = useState(16);

  // Hardcoded locations
  // Add more hardcoded locations as needed
  const initialLocations: Location[] = [
    { id: 7, lat: 21.298314426933132, lng: -157.8184396498663, name: 'Campus Center' },
    { id: 8, lat: 21.300834568399907, lng: -157.8156137935775, name: 'Palms Food Court' },
    { id: 9, lat: 21.299281182513006, lng: -157.81958314551568, name: 'Hemenway Hall' },
    { id: 10, lat: 21.294488757732687, lng: -157.81284637311558, name: 'Hale Aloha Towers' },
    { id: 11, lat: 21.295892934715724, lng: -157.81491756974012, name: 'Gateway House' },
    { id: 12, lat: 21.297513266011325, lng: -157.81823889459528, name: 'Food Truck Row' },
  ]; // Close the initialLocations array properly

  // Fetch data from the API on component mount
  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch('/api/restaurants');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = data.map((restaurant: any) => ({
          id: restaurant.id,
          lat: parseFloat(restaurant.latitude),
          lng: parseFloat(restaurant.longitude),
          name: restaurant.name,
        }));
        setLocations(formattedData);
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
        setLocations([]); // Set locations to an empty array if the request fails
      }
    }
    fetchLocations();
  }, []);

  // Handle the dropdown selection
  const handleRestaurantSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const restaurantId = parseInt(event.target.value, 10);
    setSelectedRestaurantId(restaurantId);
    setShowAllLocations(false);
    setZoom(18);

    // Find the selected location and set it as the selected location
    const location = locations.find((loc) => loc.id === restaurantId);
    if (location) {
      setSelectedLocation(location);
    }
  };

  // Reset to show all locations
  const handleReset = () => {
    setSelectedRestaurantId(null);
    setShowAllLocations(true);
    setSelectedLocation(undefined);
    setZoom(16);
  };
  return (
    <div>
      {/* Dropdown for restaurant selection */}
      <Container className="dropdown m-3">
        <Row className="justify-content-center">
          <Col xs="auto" md={4} lg={6}>
            <select
              value={selectedRestaurantId ?? ''}
              onChange={handleRestaurantSelect}
              className="form-control"
            >
              <option value="">Select a restaurant</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </Col>
          <Col xs={6} md={4} lg={3}>
            <button type="button" onClick={handleReset}>Reset</button>
          </Col>
        </Row>
      </Container>

      {/* Google Map */}
      <GoogleMap
        zoom={zoom}
        center={selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : center}
        mapContainerClassName="map-container"
      >
        {showAllLocations
          ? initialLocations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => setSelectedLocation(location)}
              icon={{
                url: '/redLocationIcon2.png',
                scaledSize: new window.google.maps.Size(40, 40),
                labelOrigin: new google.maps.Point(20, 50), // Horizontally centered, vertically just below the icon
              }}
              label={{
                text: location.name,
                color: 'black',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            />
          ))
          : selectedLocation && (
          <Marker
            key={selectedLocation.id}
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            icon={{
              url: '/redLocationIcon2.png',
              scaledSize: new window.google.maps.Size(40, 40),
              labelOrigin: new google.maps.Point(20, 50), // Horizontally centered, vertically just below the icon
            }}
            label={{
              text: selectedLocation.name,
              color: 'black',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          />
          )}

        {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={() => setSelectedLocation(undefined)}
          options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
        >
          <div>
            <h6>{selectedLocation.name}</h6>
          </div>
        </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default function Home(): ReactElement {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
}
