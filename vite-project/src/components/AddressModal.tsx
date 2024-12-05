import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: string[];
  onEdit: (address: string) => void;
  onDelete: (address: string) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  addresses,
  onEdit,
  onDelete,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<string>(addresses[0]);

  const handleEditClick = () => {
    onEdit(selectedAddress);
    onClose();
  };

  const handleDeleteClick = () => {
    onDelete(selectedAddress);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup value={selectedAddress} onChange={setSelectedAddress}>
            <Stack direction="column">
              {addresses.map((address, index) => (
                <Radio key={index} value={address}>
                  {address}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEditClick}>
            Edit
          </Button>
          <Button colorScheme="red" onClick={handleDeleteClick}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddressModal;
