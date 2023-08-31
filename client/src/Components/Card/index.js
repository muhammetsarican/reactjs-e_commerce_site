import { Box, Image, Button} from "@chakra-ui/react"

import React from 'react'
import { Link } from "react-router-dom"

function Card() {
  return (
    <Box borderWidth={'1px'} borderRadius={"1rem"} overflow={"hidden"} p={"3"}>
        <Link to="#/">
            <Image src="https://picsum.photos/seed/picsum/200/300" alt="product"></Image>
            <Box p={"6"}>
                <Box display={"flex"} alignItems={"baseline"}>
                    12/12/23
                </Box>
                <Box marginTop={"4"} fontWeight={"semibold"} as="h4" lineHeight={"tight"}>
                    Asus X541UJ GO055
                </Box> 
                <Box>100TL</Box>
            </Box>
        </Link>
        <Button colorScheme="green">Add to Basket</Button>
    </Box>
  )
}

export default Card