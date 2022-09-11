import React from "react";
import { Box } from "@chakra-ui/react";
import logo from "../images/reunion-logo.png";

export default function NavBar() {
  return (
    <Box p="2">
      <img src={logo} />
    </Box>
  );
}
