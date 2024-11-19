import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const center = {
  lat: 25.0326996781907,
  lng: -77.47713270775661
};

const App = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading state for Google Maps API
    setMapLoaded(true); 
  }, []);

  if (!mapLoaded) {
    return <div>Loading...</div>; // Show loading indicator while the map is loading
  }

  return (
    <Container>
      <Row className="w-100">
        <Col lg={6} className="my-4">
          <LoadScript googleMapsApiKey="AIzaSyAIKosgU22MTHQkgMQ4qfV0mI71UFhtlbk">
            <GoogleMap
              mapContainerStyle={{ height: '400px', width: '100%' }}
              center={center}
              zoom={11}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </Col>
      </Row>
    </Container>
  );
};

export default App;