'use client';

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Restaurant } from '@prisma/client';

interface MapProps {
  restaurant: Restaurant;
}

export default function IndividualMapComponent({ restaurant }: MapProps) {
  const mapStyles = {
    width: '100%',
    height: '300px',
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const center = useMemo(() => {
    if (!restaurant.latitude || !restaurant.longitude) {
      return null;
    }
    return {
      lat: Number(restaurant.latitude),
      lng: Number(restaurant.longitude),
    };
  }, [restaurant.latitude, restaurant.longitude]);

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  if (!center) {
    return <div>Invalid location data.</div>;
  }

  return (
    <GoogleMap zoom={17} center={center} mapContainerStyle={mapStyles}>
      <Marker position={center} />
    </GoogleMap>
  );
}
