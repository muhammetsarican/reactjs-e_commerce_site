import React, { Component } from 'react'
import Card from '../../Components/Card'
import { Box, Grid } from '@chakra-ui/react'

import { useQuery } from 'react-query'
import { fetchProductsList } from '../api'

function Products() {
  const { isLoading, error, data } = useQuery("products", fetchProductsList);
  if (isLoading) return "Loading...";

  if (error) return "An error has occured: "+error.message;

  return (
    <div>
      <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
        {
          data.map((item, key)=> <Card key={key} item={item}/>)
        }
      </Grid>
    </div>
  )
}

export default Products