import React, { useRef, useState } from 'react'
import { useBasket } from '../../Contexts/BasketContext'
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea
} from '@chakra-ui/react';
import { fetchOrderList } from '../../api';

function Basket() {
    const [address, setAddress] = useState("");
    const { items, removeFromBasket, totalPrice, emptyBasket } = useBasket()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)

    const handleOrderSubmit = async () => {
        const itemIds = items.map((item) => item._id);
        const input = {
            address,
            items:JSON.stringify(itemIds),
        }
        console.log(itemIds);
        const orderResponse = await fetchOrderList(input);

        emptyBasket()
        onClose()
        console.log(orderResponse)
    }
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
                            <Flex alignItems={"center"} justifyContent={"space-between"} margin={"25"} border={"1px solid gray"} borderRadius={"5"} padding={"15"}>
                                <Text as="h1">Total: {totalPrice()}</Text>
                                <Button colorScheme='green' variant={'outline'} onClick={onOpen}>Complete Order</Button>
                            </Flex>
                            <Modal
                                initialFocusRef={initialRef}
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Give an Order</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl>
                                            <FormLabel>Address</FormLabel>
                                            <Textarea ref={initialRef} placeholder='Enter an Address...' onChange={(e) => setAddress(e.target.value)} />
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={() => handleOrderSubmit()}>
                                            Save
                                        </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Box>
                    )}
                </Box>
            </Flex >
        </div >
    )
}

export default Basket