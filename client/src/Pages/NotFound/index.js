import { Flex, Heading,Box } from '@chakra-ui/react'
import React from 'react'

function NotFound() {
  return (
    <div>
        <Flex justifyContent={"center"} alignItems={"center"} height={"90dvh"}>
            <Box alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                <Heading fontSize={"10rem"}>404</Heading>
                <Heading fontSize={"3.5rem"}>NotFound</Heading>
            </Box>
        </Flex>
    </div>
  )
}

export default NotFound