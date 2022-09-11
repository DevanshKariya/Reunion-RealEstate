import React from "react";
import HouseImg from "../images/house.jpg";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

export default function Property(props) {
  return (
    <Flex
      flexWrap="wrap"
      w="420px"
      p="5"
      paddingTop="0px"
      justifyContent="flex-start"
      cursor="pointer"
    >
      <Box>
        <img
          src={props.coverPhoto ? props.coverPhoto.url : HouseImg}
          width={400}
          height={260}
        />
      </Box>
      <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green.400">
              {props.isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(props.price)}
              {props.rentFrequency && `/${props.rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={props.agency?.logo?.url}></Avatar>
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {props.rooms}
          <FaBed /> | {props.baths} <FaBath /> | {millify(props.area)} sqft{" "}
          <BsGridFill />
        </Flex>
        <Text fontSize="lg">
          {props.title.length > 30
            ? props.title.substring(0, 30) + "..."
            : props.title}
        </Text>
      </Box>
    </Flex>
  );
}
