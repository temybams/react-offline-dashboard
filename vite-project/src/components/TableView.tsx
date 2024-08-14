

import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  HStack,
  Box,
} from "@chakra-ui/react";
import styled from "styled-components";

const StyledTableContainer = styled(TableContainer)`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 10px;
  overflow-x: auto;
`;

const StyledTable = styled(Table)`
  table-layout: auto;
  width: 100%;
`;

const StyledTh = styled(Th)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  padding: 16px 12px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 8px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px 6px;
  }
`;

const StyledTd = styled(Td)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  padding: 16px 12px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 8px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px 6px;
  }
`;

const StyledTr = styled(Tr)`
  &:nth-child(even) {
    background-color: #f2f2f2;
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

interface TableViewProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

const TableView: React.FC<TableViewProps> = ({ contacts, onSelectContact }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  const getRandomAddress = (addresses: { value: string }[]) => {
    if (addresses.length === 0) return "No address";
    return addresses[Math.floor(Math.random() * addresses.length)].value;
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const paginationButtons = () => {
    let buttons = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (totalPages > maxPagesToShow) {
      if (startPage > 1) {
        buttons.push(
          <Button
            key={1}
            onClick={() => paginate(1)}
            colorScheme="gray"
            size="sm"
          >
            1
          </Button>
        );
        if (startPage > 2) {
          buttons.push(
            <Button key="ellipsis-start" disabled colorScheme="gray" size="sm">
              ...
            </Button>
          );
        }
      }

      for (let page = startPage; page <= endPage; page++) {
        buttons.push(
          <Button
            key={page}
            onClick={() => paginate(page)}
            colorScheme={currentPage === page ? "purple" : "gray"}
            size="sm"
          >
            {page}
          </Button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(
            <Button key="ellipsis-end" disabled colorScheme="gray" size="sm">
              ...
            </Button>
          );
        }
        buttons.push(
          <Button
            key={totalPages}
            onClick={() => paginate(totalPages)}
            colorScheme="gray"
            size="sm"
          >
            {totalPages}
          </Button>
        );
      }
    } else {
      for (let page = 1; page <= totalPages; page++) {
        buttons.push(
          <Button
            key={page}
            onClick={() => paginate(page)}
            colorScheme={currentPage === page ? "purple" : "gray"}
            size="sm"
          >
            {page}
          </Button>
        );
      }
    }

    return buttons;
  };

  return (
    <Box>
      <StyledTableContainer>
        <StyledTable variant="simple">
          <Thead>
            <Tr>
              <StyledTh>Name</StyledTh>
              <StyledTh>Phone Number</StyledTh>
              <StyledTh>Email</StyledTh>
              <StyledTh>Address</StyledTh>
              <StyledTh>Longitude</StyledTh>
              <StyledTh>Latitude</StyledTh>
              <StyledTh>Action</StyledTh>
            </Tr>
          </Thead>
          <Tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact, index) => (
                <StyledTr key={index}>
                  <StyledTd>{contact.name}</StyledTd>
                  <StyledTd>{contact.phoneNumber}</StyledTd>
                  <StyledTd>{contact.email}</StyledTd>
                  <StyledTd>{getRandomAddress(contact.addresses)}</StyledTd>
                  <StyledTd>{contact.longitude}</StyledTd>
                  <StyledTd>{contact.latitude}</StyledTd>
                  <StyledTd>
                    <Button
                      onClick={() => onSelectContact(contact)}
                      colorScheme="purple"
                      size="sm"
                    >
                      View on Map
                    </Button>
                  </StyledTd>
                </StyledTr>
              ))
            ) : (
              <StyledTr>
                <Td colSpan={7}>No contacts found</Td>
              </StyledTr>
            )}
          </Tbody>
        </StyledTable>
      </StyledTableContainer>

      <HStack justifyContent="center" mb={6} mt={10} spacing={2}>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          colorScheme="blue"
          size="sm"
        >
          Previous
        </Button>
        {paginationButtons()}
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          colorScheme="purple"
          size="sm"
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default TableView;
