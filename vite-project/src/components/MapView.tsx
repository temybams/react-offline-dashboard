import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";
import { Contact } from "../types/types";
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface MapViewProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

const MapView: React.FC<MapViewProps> = ({
  contacts,
  selectedContact,
  onSelectContact,
}) => {
  const [mapCenter, setMapCenter] = useState({
    lat: contacts.length > 0 ? contacts[0].latitude : 0,
    lng: contacts.length > 0 ? contacts[0].longitude : 0,
  });

  useEffect(() => {
    if (selectedContact) {
      setMapCenter({
        lat: selectedContact.latitude,
        lng: selectedContact.longitude,
      });
    }
  }, [selectedContact]);

  return (
    <Box width="100%" height="500px">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={9}
          center={mapCenter}
        >
          {contacts.map((contact) => (
            <Marker
              key={contact.email}
              position={{ lat: contact.latitude, lng: contact.longitude }}
              label={contact.name}
              icon={
                selectedContact && selectedContact.email === contact.email
                  ? {
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }
                  : undefined
              }
              onClick={() => onSelectContact(contact)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default MapView;
