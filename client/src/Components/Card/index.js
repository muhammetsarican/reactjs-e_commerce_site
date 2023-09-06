import { Box, Image, Button} from "@chakra-ui/react"
import moment from 'moment'
import React from 'react'
import { Link } from "react-router-dom"

function Card({item}) {
  return (
    <Box borderWidth={'1px'} borderRadius={"1rem"} overflow={"hidden"} p={"3"}>
        <Link to={`product/${item._id}`}>
            <Image src={item.photos[0]} alt="product" loading="lazy"></Image>
            <Box p={"6"}>
                <Box display={"flex"} alignItems={"baseline"}>
                    {moment(item.createdAt).format("DD/MM/YY")}
                </Box>
                <Box marginTop={"4"} fontWeight={"semibold"} as="h4" lineHeight={"tight"}>
                    {item.title}
                </Box> 
                <Box>{item.price}TL</Box>
            </Box>
        </Link>
        <Button colorScheme="green">Add to Basket</Button>
    </Box>
  )
}

export default Card