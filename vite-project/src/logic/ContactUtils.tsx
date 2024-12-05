import { Contact } from "../types/types";
export const handleDeleteAddress = (
  contactList: Contact[],
  addressToDelete: string,
  setContactList: React.Dispatch<React.SetStateAction<Contact[]>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const updatedContacts = contactList.map((contact) => ({
    ...contact,
    addresses: contact.addresses.filter(
      (address) => address.value !== addressToDelete
    ),
  }));

  setContactList(updatedContacts);
  localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  setIsModalOpen(false);
};
