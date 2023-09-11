import { Flex, Heading, Box, Button } from '@chakra-ui/react';
import { Popconfirm, Space, Table } from "antd";
import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchDeleteProduct, fetchProductsList } from '../../../api';
import { Link } from "react-router-dom";

function Products() {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery("admin:products", fetchProductsList);
  const deleteMutation = useMutation(fetchDeleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products")
  });
  const columns = useMemo(() => {
    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size={"middle"}>
            <Link to={`/admin/product/${record._id}`}>
              <a>Edit</a>
            </Link>
            <Popconfirm title="Are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("Successfully deleted.")
                  }
                })
              }}
              onCancel={() => { console.log("Canceled") }}
              okText="Delete"
              cancelText="Cancel"
              placement='right'>
              <a href='#'>
                Delete
              </a>
            </Popconfirm>
          </Space>
        )
      },
    ]
  }, []);


  if (isLoading) return "Loading...";
  if (error) return "An error has occured " + error.message;

  return (
    <div>
      <Flex>
        <Box width={"full"}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Heading mt={"1.5rem"}>
              Products
            </Heading>
            <Link to="/admin/product/create">
              <Button colorScheme='green'>
                New
              </Button>
            </Link>
          </Flex>
          <Flex>
            <Table dataSource={data} columns={columns} rowKey={"_id"} style={{ width: "100%", marginTop: "1.5rem" }} />
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}

export default Products