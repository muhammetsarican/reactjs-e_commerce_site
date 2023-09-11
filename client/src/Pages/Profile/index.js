import React from 'react'
import { useAuth } from "../../Contexts/AuthContext"
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function Profile() {
    const { user, logout } = useAuth();
    
    const handleLogout = async () => {
        console.log(logout());
    }
    return (
        <div>
            <Flex mt="10" justifyContent={"center"} alignItems={"center"} height="75vh">
                <Box border="1px dashed gray" borderRadius="15" px="20" py="10" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height="full">
                    <Box justifySelf={"flex-start"}>
                        <Heading textAlign={"center"}>Profile</Heading>
                    </Box>
                    <Box mt="4">
                        <Text>ID: {user._id}</Text>
                    </Box>
                    <Box mt="4">
                        <Text>Role: {user.role}</Text>
                    </Box>
                    <Box mt="4">
                        <Text>E-Mail: {user.email}</Text>
                    </Box>
                    <Box mt="5">
                        <Link to="/signin">
                            <Button width="full" colorScheme='red' onClick={handleLogout}>Logout</Button>
                        </Link>
                    </Box>
                </Box>
            </Flex>
        </div>
    )
}

export default Profile