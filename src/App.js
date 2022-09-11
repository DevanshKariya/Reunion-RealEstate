import React from "react";
import { Flex, Box, Text, Icon, Select } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import NavBar from "./Components/NavBar";
import Property from "./Components/Property";
import {
  rentFrequency,
  minPrice,
  maxPrice,
  areaMax,
  roomsMin,
  bathsMin,
} from "./utils/filterData";

export default function App() {
  const [propertyData, setPropertyData] = React.useState([]);
  const [searchFilters, setSearchFilters] = React.useState(false);
  const [filterVal, setFilterVal] = React.useState({
    rentFrequency: "",
    minPrice: "",
    maxPrice: "",
    areaMax: "",
    roomsMin: "",
    bathsMin: "",
  });

  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bd51ccca9dmsh51dfffb298061ffp1f6913jsn246c7799a5fe",
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    };

    fetch(
      `https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=9&lang=en&rentFrequency=${filterVal.rentFrequency}&priceMin=${filterVal.minPrice}&priceMax=${filterVal.maxPrice}&areaMax=${filterVal.areaMax}&roomsMin=${filterVal.roomsMin}&bathsMin=${filterVal.bathsMin}`,
      options
    )
      .then((response) => response.json())
      .then(({ hits }) => setPropertyData(hits))
      .catch((err) => console.error(err));
  }, [filterVal]);

  function handleChange(event) {
    console.log(event);
    const { name, value } = event.target;
    setFilterVal((prevFilterVal) => {
      return {
        ...prevFilterVal,
        [name]: value,
      };
    });
  }

  console.log(propertyData);

  // const { hits } = propertyData;

  const propertyCard = propertyData.map((prop) => {
    return (
      <Property
        coverPhoto={prop.coverPhoto}
        price={prop.price}
        rentFrequency={prop.rentFrequency}
        rooms={prop.rooms}
        title={prop.title}
        baths={prop.baths}
        area={prop.area}
        agency={prop.agency}
        isVerified={prop.isVerified}
        externalID={prop.externalID}
        key={prop.id}
      />
    );
  });
  return (
    <Box>
      <NavBar />
      <Flex
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && (
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
          <Box key={rentFrequency.queryName}>
            <Select
              onChange={handleChange}
              placeholder={rentFrequency.placeholder}
              value={filterVal.rentFrequency}
              name="rentFrequency"
            >
              {rentFrequency.items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box key={minPrice.queryName}>
            <Select
              onChange={handleChange}
              placeholder={minPrice.placeholder}
              value={filterVal.minPrice}
              name="minPrice"
            >
              {minPrice.items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box key={maxPrice.queryName}>
            <Select
              onChange={handleChange}
              placeholder={maxPrice.placeholder}
              value={filterVal.maxPrice}
              name="maxPrice"
            >
              {maxPrice.items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box key={areaMax.queryName}>
            <Select
              onChange={handleChange}
              placeholder={areaMax.placeholder}
              value={filterVal.areaMax}
              name="areaMax"
            >
              {areaMax.items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box key={roomsMin.queryName}>
            <Select
              onChange={handleChange}
              placeholder={roomsMin.placeholder}
              value={filterVal.roomsMin}
              name="roomsMin"
            >
              {roomsMin.items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box key={bathsMin.queryName}>
            <Select
              onChange={handleChange}
              placeholder={bathsMin.placeholder}
              value={filterVal.bathsMin}
              name="bathsMin"
            >
              {bathsMin.items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
      )}
      <Text
        fontSize="4xl"
        fontWeight="black"
        marginLeft="13"
        marginTop="15"
        marginBottom="5"
      >
        Properties for-rent
      </Text>
      <Flex flexWrap="wrap">{propertyCard}</Flex>
      {propertyData.length === 0 && (
        <Flex justifyContent="center" alignItems="center">
          <img alt="no result" src="./images/noResult.svg" />
          <Text fontSize="2xl" marginTop="3">
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
}
