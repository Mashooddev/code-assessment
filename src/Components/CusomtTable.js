import React from "react";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";

const CustomTable = ({ data, editItem, deleteItem }) => {
  return (
    <TableContainer>
      <ChakraTable variant="simple">
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
          {data.length > 0 ? (
            data.map((item, index) => (
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
                      <MenuItem onClick={() => editItem(item.id)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => deleteItem(item.id)}>
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
      </ChakraTable>
    </TableContainer>
  );
};

export default CustomTable;
