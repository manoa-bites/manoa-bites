'use client';

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

function Map() {
  const center = useMemo(() => ({ lat: 21.29980545928421, lng: -157.81515541975028 }), []);

  const foodLocations = [
    { lat: 21.29879998397199, lng: -157.81968899784732, name: 'Sushi Paradise' },
    { lat: 21.2982044679266, lng: -157.81876971645244, name: 'Taco Town' },
    { lat: 21.298008165606237, lng: -157.81863202473562, name: 'Dragon Noodles' },
    { lat: 21.30087336183259, lng: -157.81564733341656, name: 'Burger Bliss' },
    { lat: 21.301064467462503, lng: -157.815696903663, name: 'Steakhouse Supreme' },
    { lat: 21.298118124295275, lng: -157.8188234068451, name: 'Pizza Haven' },
  ];

  return (
    <GoogleMap zoom={19} center={center} mapContainerClassName="map-container">
      {foodLocations.map((location) => (
        <Marker
          key={location.name}
          position={{ lat: location.lat, lng: location.lng }}
          label={location.name}
        />
      ))}
    </GoogleMap>
  );
}

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
}
