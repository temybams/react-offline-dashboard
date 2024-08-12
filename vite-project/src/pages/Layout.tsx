import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

const Layout: React.FC = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }} 
      minH="100vh"
      bg="gray.50"
    >
      <Box
        w={{ base: '100%', md: '250px' }} 
        bg="white"
        shadow="md"
      >
        <Sidebar />
      </Box>
      <Box
        flex="1"
        p={{ base: '10px', md: '20px' }} 
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
