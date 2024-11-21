'use client';

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// Function contains information on what is loaded in map.
function Map() {
  const center = useMemo(() => ({ lat: 21.29980545928421, lng: -157.81515541975028 }), []);
  return (
    <GoogleMap zoom={19} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}

// Renders the map component using the API key.
export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
