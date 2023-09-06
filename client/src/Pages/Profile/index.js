import React from 'react'
import { useAuth } from "../../Contexts/AuthContext"
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { fetchLogout } from '../api';
import { Link } from "react-router-dom";

function Profile() {
    const { user } = useAuth();
    
    const logout = async () => {
        const refreshToken=localStorage.getItem("refresh-token");
        const logoutResponse = await fetchLogout(refreshToken);
        console.log(logoutResponse);
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
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
                            <Button width="full" colorScheme='red' onClick={logout}>Logout</Button>
                        </Link>
                    </Box>
                </Box>
            </Flex>
        </div>
    )
}

export default Profile