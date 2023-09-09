import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import Home from "./Home/index"
import Products from "./Products/index"
import Orders from "./Orders/index"

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
        </Switch>
    </Box>
  )
}

export default Admin