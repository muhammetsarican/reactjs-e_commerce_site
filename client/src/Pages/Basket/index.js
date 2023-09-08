import { Box, Button, Flex, Heading, Image, Alert, AlertIcon, AlertTitle, AlertDescription, Text } from '@chakra-ui/react'
import React from 'react'
import { useBasket } from '../../Contexts/BasketContext'
import { Link } from 'react-router-dom'

function Basket() {
    const { items, removeFromBasket, totalPrice } = useBasket()
    return (
        <div>
            <Flex alignItems={"center"} flexDirection={"column"} width={"full"}>
                <Box>
                    <Heading>Basket</Heading>
                </Box>
                <Box width={"full"} px={"55"}>
                    {items.length === 0 && (
                        <Alert status="warning"><AlertIcon></AlertIcon><AlertTitle>Empty Basket</AlertTitle><AlertDescription>No item in your basket.</AlertDescription></Alert>
                    )}
                    {items.length > 0 && items.map((item) => (

                        <Flex alignItems={"center"} justifyContent={"space-between"} margin={"25"} border={"1px solid gray"} borderRadius={"5"} padding={"15"}>
                            <Box>
                                <Image src={item.photos[0]} width={"5rem"} height={"3rem"} objectFit={"cover"}></Image>
                            </Box>
                            <Box>
                                <Link to={`/product/${item._id}`}>
                                    {item._id}
                                </Link>
                            </Box>
                            <Box>
                                <Link to={`/product/${item._id}`}>
                                    {item.title}
                                </Link>
                            </Box>
                            <Box>
                                <Link to={`/product/${item._id}`}>
                                    {item.price}
                                </Link>
                            </Box>
                            <Box>
                                <Button colorScheme='red' variant={"outline"} onClick={() => { removeFromBasket(item._id) }}>Delete</Button>
                            </Box>
                        </Flex>

                    ))
                    }
                    {items.length > 0 && (
                        <Box>
                            <Flex alignItems={"center"} justifyContent={"flex-end"} margin={"25"} border={"1px solid gray"} borderRadius={"5"} padding={"15"}>
                                <Text as="h1">Total: {totalPrice()}</Text>
                            </Flex>
                        </Box>
                    )}
                </Box>
            </Flex >
        </div >
    )
}

export default Basket