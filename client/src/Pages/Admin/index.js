import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import Home from "./Home"
import Products from "./Products"
import Orders from "./Orders"
import ProductDetail from './Product Detail'
import ProductCreate from './Product Create'

function Admin() {
    const {path, url}=useRouteMatch()
  return (
    <Box padding={"3rem"}>
        <Flex justifyContent={"space-evenly"}>
            <Link to={`${url}/`}>
                <Button colorScheme={'grey'} variant={"outline"} height={"1.2rem"}>
                    Home
                </Button>
            </Link>
            <Link to={`${url}/products`}>
                <Button colorScheme='grey' variant={"outline"} height={"1.2rem"}>
                    Products
                </Button>
            </Link>
            <Link to={`${url}/orders`}>
                <Button colorScheme='grey' variant={"outline"} height={"1.2rem"}>
                    Orders
                </Button>
            </Link>
        </Flex>
        <Switch>
            <Route exact path={`${path}`} component={Home}></Route>
            <Route path={`${path}/products`} component={Products}></Route>
            <Route path={`${path}/orders`} component={Orders}></Route>
            <Route path={`${path}/product/create`} component={ProductCreate}></Route>
            <Route exact strict path={`${path}/product/:product_id`} component={ProductDetail}></Route>
        </Switch>
    </Box>
  )
}

export default Admin