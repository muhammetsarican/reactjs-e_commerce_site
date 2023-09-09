import { Box, Flex, Heading, Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from 'react-query';
import React from 'react'
import { fetchOrderListAdmin } from '../../../api'

function Orders() {
  const { isLoading, data, error } = useQuery("admin:orders", fetchOrderListAdmin);

  if (isLoading) return "Loading...";
  if (error) return `An error has occured ${error.message}`;
  return (
    <div>
      <Flex margin={"25"}>
        <Box width={"full"}>
          <Flex justifyContent={"center"}>
            <Heading>Orders</Heading>
          </Flex>
          <Flex my="15">
            <Table>
              <TableCaption>@muhammetsarican</TableCaption>
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Address</Th>
                  <Th isNumeric={true}>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.user.email}</Td>
                    <Td>{item.adress}</Td>
                    <Td isNumeric={true}>{item.items.length}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>User</Th>
                  <Th>Address</Th>
                  <Th isNumeric>Quantity</Th>
                </Tr>
              </Tfoot>
            </Table>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}

export default Orders