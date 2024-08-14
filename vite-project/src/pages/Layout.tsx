import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

const Layout: React.FC = () => {
  return (
    <Flex minHeight="100vh">
      <Box width={{ base: "0px", md: "250px" }}></Box>
      <Sidebar />
      <Box flex="1" p={{ base: 4, md: 6 }} bg="gray.50">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
