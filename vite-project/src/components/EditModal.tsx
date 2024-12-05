// EditModal.tsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string; // Ensure address is included here
  onSubmit: (updatedAddress: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  address,
  onSubmit,
}) => {
  const [updatedAddress, setUpdatedAddress] = React.useState(address);

  const handleSubmit = () => {
    onSubmit(updatedAddress);
    setUpdatedAddress("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Address</ModalHeader>
        <ModalBody>
          <Input
            value={updatedAddress}
            onChange={(e) => setUpdatedAddress(e.target.value)}
            placeholder="Enter new address"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
