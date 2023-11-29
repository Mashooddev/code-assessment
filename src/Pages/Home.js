import React, { useState, useEffect, useMemo } from "react";
import { Card } from "@chakra-ui/react";
import "../Styles/Home.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { HStack, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

export default function Home() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  function getSectorData() {
    let storedData = localStorage.getItem("sector");
    if (storedData) {
      let dataArray = JSON.parse(storedData);
      console.log(dataArray);
      setList(dataArray);
    } else {
      setList([]);
    }
  }

  function deleteSectorData(id) {
    let storedData = localStorage.getItem("sector");
    if (storedData) {
      let dataArray = JSON.parse(storedData);
      let filteredData = dataArray.filter((item) => item.id !== id);
      localStorage.setItem("sector", JSON.stringify(filteredData));
      setList(filteredData);
    }
  }

  useEffect(() => {
    getSectorData();
  }, []);

  const memoizedList = useMemo(() => list, [list]);

  return (
    <div className="home-main">
      <Card>
        <HStack justifyContent={"space-between"} p={3}>
          <Text fontSize={20}>Sectors</Text>
          <Button onClick={() => navigate("/form")}>Add Sector</Button>
        </HStack>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Sector</Th>
                <Th>Agree to terms</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {memoizedList.length > 0 ? (
                memoizedList.map((item, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.sector}</Td>
                    <Td>{item.agree.toString()}</Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<HiDotsVertical />}
                          variant="outline"
                        />
                        <MenuList>
                          <MenuItem
                            onClick={() => navigate(`/form/${item.id}`)}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => deleteSectorData(item.id)}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign={"center"}>
                    No data found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
