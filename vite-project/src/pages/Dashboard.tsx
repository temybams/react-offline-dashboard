import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spinner,
  Text,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import styled from "styled-components";
import MapView from "../components/MapView";
import TableView from "../components/TableView";

const DashboardContainer = styled(Box)`
  margin-left: 90px;
  margin-top: 50px;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #ffff;

  @media (max-width: 1024px) {
    margin-left: 70px; 
    padding: 15px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    padding: 5px;
    margin-top: 70px;
  }
`;

interface Contact {
  name: string;
  phoneNumber: string;
  email: string;
  addresses: { value: string }[];
  longitude: number;
  latitude: number;
}

const DashboardContent: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isMapView, setIsMapView] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const storedContacts = localStorage.getItem("contacts");
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (e) {
        setError("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const toggleView = () => {
    setIsMapView((prev) => !prev);
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsMapView(true); 
  };

  return (
    <DashboardContainer>
      <Flex direction="column">
        <FormControl display="flex" alignItems="center" mb={4}>
          <FormLabel htmlFor="view-toggle" mb="0">
            {isMapView ? "Map View" : "Table View"}
          </FormLabel>
          <Switch
            id="view-toggle"
            isChecked={isMapView}
            onChange={toggleView}
          />
        </FormControl>

        {loading && <Spinner size="xl" color="teal.500" />}
        {error && <Text color="red.500">{error}</Text>}

        {!loading && !error && (
          <>
            {isMapView ? (
              <MapView
                contacts={contacts}
                selectedContact={selectedContact}
                onSelectContact={handleSelectContact}
              />
            ) : (
              <TableView
                contacts={contacts}
                onSelectContact={handleSelectContact}
              />
            )}
          </>
        )}
      </Flex>
    </DashboardContainer>
  );
};

export default DashboardContent;

