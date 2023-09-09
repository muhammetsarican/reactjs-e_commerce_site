import { Flex, Heading, Box } from '@chakra-ui/react';
import { Popconfirm, Space, Table } from "antd";
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchDeleteProduct, fetchProductsList } from '../../../api';
import { Link } from "react-router-dom";

function Products() {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery("admin:products", fetchProductsList);
  const deleteMutation = useMutation(fetchDeleteProduct, {
    onSuccess: queryClient.invalidateQueries("admin:products")
  });


  if (isLoading) return "Loading...";
  if (error) return "An error has occured " + error.message;

  const columns = [
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
  ];
  return (
    <div>
      <Flex>
        <Box width={"full"}>
          <Flex justifyContent={"center"}>
            <Heading mt={"1.5rem"}>
              Products
            </Heading>
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