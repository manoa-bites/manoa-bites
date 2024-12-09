'use client';

import { useMemo, useState, useEffect, ReactElement } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

type Location = {
  id: number;
  lat: number;
  lng: number;
  name: string;
};

function Map(): ReactElement {
  const center = useMemo(() => ({ lat: 21.29980545928421, lng: -157.81515541975028 }), []);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

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

  return (
    <GoogleMap zoom={19} center={center} mapContainerClassName="map-container">
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
            <h2>{selectedLocation.name}</h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default function Home(): ReactElement {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
}
