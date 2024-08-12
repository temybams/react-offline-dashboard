import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box } from '@chakra-ui/react';


const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface Contact {
  name: string;
  longitude: number;
  latitude: number;
}

interface MapViewProps {
  contacts: Contact[];
}

const MapView: React.FC<MapViewProps> = ({ contacts }) => {
  const mapCenter = {
    lat: contacts.length > 0 ? contacts[0].latitude : 0,
    lng: contacts.length > 0 ? contacts[0].longitude : 0,
  };

  return (
    <Box width="100%" height="500px">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          zoom={10}
          center={mapCenter}
        >
          {contacts.map((contact) => (
            <Marker
              key={contact.name}
              position={{ lat: contact.latitude, lng: contact.longitude }}
              label={contact.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default MapView;
