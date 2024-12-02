'use client';

import { useMemo, useState, ReactElement } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

type Location = {
  lat: number;
  lng: number;
  name: string;
  description: string;
};

function Map(): ReactElement {
  const center = useMemo(() => ({ lat: 21.29980545928421, lng: -157.81515541975028 }), []);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const foodLocations: Location[] = [
    {
      lat: 21.29879998397199,
      lng: -157.81968899784732,
      name: 'Sushi Paradise',
      description: 'Enjoy the finest sushi and sashimi at UH, fresh from the sea every day.',
    },
    {
      lat: 21.2982044679266,
      lng: -157.81876971645244,
      name: 'Taco Town',
      description: 'Authentic Mexican tacos with homemade salsa and guacamole.',
    },
    {
      lat: 21.298008165606237,
      lng: -157.81863202473562,
      name: 'Dragon Noodles',
      description: 'Spicy and aromatic Asian noodles with a variety of toppings.',
    },
    {
      lat: 21.30087336183259,
      lng: -157.81564733341656,
      name: 'Burger Bliss',
      description: 'Classic American burgers with premium, grass-fed beef and fresh, local ingredients.',
    },
    {
      lat: 21.301064467462503,
      lng: -157.815696903663,
      name: 'Steakhouse Supreme',
      description: 'Savor exquisite cuts of steak perfectly seared to your preference.',
    },
    {
      lat: 21.298118124295275,
      lng: -157.8188234068451,
      name: 'Pizza Haven',
      description: 'Stone-baked pizzas with a wide range of custom toppings and homemade sauces.',
    },
  ];

  return (
    <GoogleMap zoom={19} center={center} mapContainerClassName="map-container">
      {foodLocations.map((location) => (
        <Marker
          key={location.name}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => setSelectedLocation(location)}
          icon={{
            url: '/redLocationIcon2.png',
            scaledSize: new window.google.maps.Size(40, 40),
            labelOrigin: new google.maps.Point(20, 50)  // Horizontally centered, vertically just below the icon

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
            <p>{selectedLocation.description}</p>
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
