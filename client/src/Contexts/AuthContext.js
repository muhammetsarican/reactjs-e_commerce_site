import { createContext, useContext, useEffect, useState } from "react";
import { fetchLogout, fetchMe } from "../api";
import { Flex, Spinner } from "@chakra-ui/react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading]=useState(true)
    
    useEffect(() => {
        (async () => {
            try {
                const meResponse = await fetchMe()
                setLoggedIn(true)
                setUser(meResponse.data);
                setLoading(false)
            }
            catch (err) {
                setLoading(false)
            }
        })()
    }, [])

    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);

        localStorage.setItem("access-token", data.accessToken);
        localStorage.setItem("refresh-token", data.refreshToken);
    };

    const logout=async()=>{
        setLoggedIn(false);
        setUser(null);

        const logoutResponse=await fetchLogout();

        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        return logoutResponse;
    }
    const values = {
        loggedIn,
        user,
        login,
        logout
    }
    if(loading){
        return <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="red.500"></Spinner>
        </Flex>
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }