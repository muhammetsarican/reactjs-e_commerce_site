import React, { Component } from 'react'
import Card from '../../../Components/Card'
import { Box, Grid } from '@chakra-ui/react'

export class Products extends Component {
  render() {
    return (
      <div>
      <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
        <Card />
        <Card />
        <Card />
        <Card />
        </Grid></div>
    )
  }
}

export default Products