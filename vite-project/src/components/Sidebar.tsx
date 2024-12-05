import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  VStack,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const linkColor = useColorModeValue("#333", "#333");
  const activeLinkColor = useColorModeValue("#ffffff", "#ffffff");
  const activeBg = useColorModeValue("#5925dc", "#5925dc");
  const sidebarBg = useColorModeValue("#ffffff", "#ffffff");

  const linkStyles = ({ isActive }: { isActive: boolean }) => ({
    backgroundColor: isActive ? activeBg : "transparent",
    color: isActive ? activeLinkColor : linkColor,
    padding: "15px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "block",
    fontSize: "18px",
  });

  const SidebarContent = (
    <VStack
      as="nav"
      spacing="20px"
      align="stretch"
      padding="20px"
      bg={sidebarBg}
      height="100vh"
      width={{ base: "70%", sm: "250px" }}
      position="fixed"
      boxShadow={{ base: "none", md: "2px 0 5px rgba(0, 0, 0, 0.2)" }}
      display="flex"
      flexDirection="column"
      top="0"
      left="0"
    >
      <VStack align="stretch" spacing="15px">
        <NavLink to="/dashboard" style={linkStyles}>
          Dashboard
        </NavLink>
        <NavLink to="/add-contact" style={linkStyles}>
          Add Contact
        </NavLink>
      </VStack>
    </VStack>
  );

  return (
    <>
      <Box display={{ base: "none", md: "block" }}>{SidebarContent}</Box>

      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
        position="fixed"
        top="15px"
        left="15px"
        zIndex="modal"
      />

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {SidebarContent}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
