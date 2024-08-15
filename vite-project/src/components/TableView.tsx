import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import AddressModal from "./AddressModal";
import EditModal from "./EditModal";
import { handleDeleteAddress } from "../logic/ContactUtils";

const StyledTableContainer = styled(TableContainer)`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 10px;
  overflow-x: auto; /* Enables horizontal scrolling on small screens */

  @media (max-width: 768px) {
    padding: 10px;
  }
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
    padding: 8px 6px;
    font-size: 14px;
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
    padding: 8px 6px;
    font-size: 14px;
  }
`;

const AddressTd = styled(StyledTd)`
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: blue;
  }
`;

const StyledTr = styled(Tr)`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  @media (max-width: 768px) {
    &:nth-child(even) {
      background-color: #e0e0e0;
    }
  }
`;

const ActionTd = styled(Td)`
  white-space: nowrap;
  overflow: visible;
  max-width: none;
  padding: 16px 12px;
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 8px 6px;
    font-size: 14px;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactList, setContactList] = useState<Contact[]>(contacts);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContactList(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contactList));
  }, [contactList]);

  const handleAddressClick = (addresses: { value: string }[]) => {
    const addressValues = addresses.map((address) => address.value);
    setSelectedAddresses(addressValues);
    setIsModalOpen(true);
  };

  // const handleEditClick = (contact: Contact) => {
  //   setSelectedContact(contact);
  //   const addresses = contact.addresses.map((address) => address.value);

  //   if (addresses.length > 1) {
  //     setSelectedAddresses(addresses);
  //     setIsModalOpen(true);
  //   } else {
  //     setSelectedAddress(addresses[0] || "");
  //     setIsUpdateModalOpen(true);
  //   }
  // };

  const handleDelete = (address: string) => {
    handleDeleteAddress(contactList, address, setContactList, setIsModalOpen);
  };

  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address);
    setIsModalOpen(false);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateAddress = (updatedAddress: string) => {
    if (selectedContact) {
      const updatedContacts = contactList.map((contact) => {
        if (contact === selectedContact) {
          const updatedAddresses = contact.addresses.map((address) =>
            address.value === selectedAddress
              ? { value: updatedAddress }
              : address
          );
          return { ...contact, addresses: updatedAddresses };
        }
        return contact;
      });

      setContactList(updatedContacts);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      setSelectedContact(null);
      setSelectedAddress(null);
    }
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contactList.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const totalPages = Math.ceil(contactList.length / contactsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
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
                  <AddressTd
                    onClick={() => handleAddressClick(contact.addresses)}
                  >
                    {contact.addresses[0]?.value || "No address"}
                  </AddressTd>
                  <StyledTd>{contact.longitude}</StyledTd>
                  <StyledTd>{contact.latitude}</StyledTd>
                  <ActionTd>
                    {" "}
                    {/* Use ActionTd here */}
                    <Button
                      onClick={() => onSelectContact(contact)}
                      colorScheme="purple"
                      size="sm"
                    >
                      View on Map
                    </Button>
                  </ActionTd>
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

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <IconButton
          icon={<ArrowLeftIcon />}
          aria-label="Previous Page"
          onClick={prevPage}
          isDisabled={currentPage === 1}
        />
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <IconButton
          icon={<ArrowRightIcon />}
          aria-label="Next Page"
          onClick={nextPage}
          isDisabled={currentPage === totalPages}
        />
      </Flex>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addresses={selectedAddresses}
        onEdit={handleSelectAddress}
        onDelete={handleDelete}
      />

      {selectedAddress && (
        <EditModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          address={selectedAddress}
          onSubmit={handleUpdateAddress}
        />
      )}
    </Box>
  );
};

export default TableView;

