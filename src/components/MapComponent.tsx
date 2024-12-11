'use client';

import { useMemo, useState, useEffect, ReactElement, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

type Location = {
  id: number;
  lat: number;
  lng: number;
  name: string;
};

function Map(): ReactElement {
  const center = useMemo(() => ({ lat: 21.29865113996328, lng: -157.8170814659863 }), []);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);

  // Fetch data from the API on component mount
  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch('/api/restaurants');
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
      }
    }

    fetchLocations();
  }, []);

  // Handle the dropdown selection
  const handleRestaurantSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const restaurantId = parseInt(event.target.value, 10);
    setSelectedRestaurantId(restaurantId);

    // Find the selected location and set it as the selected location
    const location = locations.find((loc) => loc.id === restaurantId);
    if (location) {
      setSelectedLocation(location);
    }
  };

  return (
    <div>
      {/* Dropdown for restaurant selection */}
      <div className="dropdown m-3">
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
      </div>

      {/* Google Map */}
      <GoogleMap zoom={17} center={selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : center} mapContainerClassName="map-container">
        {locations.map((location) => (
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
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
            options={{ pixelOffset: new window.google.maps.Size(0, -30) }} // Moves the InfoWindow up by 30 pixels
          >
            <div>
              <h4>{selectedLocation.name}</h4>
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
