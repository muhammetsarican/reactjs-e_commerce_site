import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { origin } = new URL(config.url);

    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins[0].includes(origin)) {
        config.headers.authorization = token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const fetchProductsList = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT || 'http://localhost:4000/'}product?page=${pageParam}`);
    return data;
};
export const fetchProduct = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT || 'http://localhost:4000/'}product/${id}`);
    return data;
};

export const loginFetch = async (values) => {
    const loginResponse = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT || 'http://localhost:4000/'}auth/login`, {
        email: values.email,
        password: values.password
    });
    return loginResponse;
}

export const fetchRegister = async (values) => {
    const data = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT || 'http://localhost:4000/'}auth/register`, {
        email: values.email,
        password: values.password
    });
    return data;
}

export const fetchMe = async () => {
    const meResponse = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT || 'http://localhost:4000/'}auth/me`)
    return meResponse;
}

export const fetchLogout = async () => {
    const logoutResponse = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}auth/logout`, {
        refresh_token: localStorage.getItem("refresh-token")
    });
    return logoutResponse;
}

export const fetchOrderList = async (values) => {
    const orderResponse = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}order`,
        values
    );
    return orderResponse;
}

export const fetchOrderListAdmin = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}order`);
    return data;
}

export const fetchDeleteProduct=async (productId)=>{
    const {data }=await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}product/${productId}`);
    return data;
}