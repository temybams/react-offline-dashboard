import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import styled from "styled-components";
import { contacts } from "../data/ContactsData";
import MapView from "../components/MapView";

const DashboardContainer = styled(Box)`
  margin-left: 90px;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #f9fafb; /* Layout background color */

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  background-color: #ffffff; /* Table background color */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 20px;
`;

const StyledTr = styled(Tr)`
  &:nth-child(even) {
    background-color: #f2f2f2; /* Row background color for even rows */
  }
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <MapView contacts={contacts} />
      <StyledTableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
              <Th>Address</Th>
              <Th>Longitude</Th>
              <Th>Latitude</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contacts.map((contact) => (
              <StyledTr key={contact.email}>
                <Td>{contact.name}</Td>
                <Td>{contact.phoneNumber}</Td>
                <Td>{contact.email}</Td>
                <Td>{contact.addresses[0]}</Td>
                <Td>{contact.longitude}</Td>
                <Td>{contact.latitude}</Td>
              </StyledTr>
            ))}
          </Tbody>
        </Table>
      </StyledTableContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
