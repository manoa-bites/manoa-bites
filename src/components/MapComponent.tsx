'use client';

import { useMemo, useState, ReactElement } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

type Location = {
  lat: number;
  lng: number;
  name: string;
};

function Map(): ReactElement {
  const center = useMemo(() => ({ lat: 21.29980545928421, lng: -157.81515541975028 }), []);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const foodLocations: Location[] = [
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
          onClick={() => setSelectedLocation(location)}
          label={location.name}
        />
      ))}

      {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div>
            <h2>{selectedLocation.name}</h2>
            <p>
              Description or details about
              <br />
              {selectedLocation.name}
            </p>
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
