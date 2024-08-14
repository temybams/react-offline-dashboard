import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '../types/types';

export const useContactForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => { 
    try {

      const contactData: Contact = {
        ...data,
        addresses: data.addresses || [],
      };

      const existingContacts = localStorage.getItem('contacts');
      const contacts = existingContacts ? JSON.parse(existingContacts) : [];
      contacts.push(contactData);
      localStorage.setItem('contacts', JSON.stringify(contacts));

      toast({
        title: 'Contact added.',
        description: 'Contact has been successfully added to the list.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
    
      toast({
        title: 'An error occurred.',
        description: 'Failed to add the contact. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return { onSubmit };
};
