import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../api';
import ImageGallery from "react-image-gallery";
import { Box, Button, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useBasket } from '../../Contexts/BasketContext';


function ProductDetail() {
    const { addToBasket, items } = useBasket();
    const { product_id } = useParams();
    const { isLoading, data, error } = useQuery(["products", product_id], () => fetchProduct(product_id))
    if (isLoading) return "Loading...";
    if (error) return "An error has occured " + error.message;

    const removeFromBasket=items.find(item=>item._id===product_id);

    const images = [
        {
            original: data.photos[0],
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
    ];
    return (
        <div>
            <Button colorScheme={removeFromBasket?"red":"green"} onClick={()=>addToBasket(data, removeFromBasket)}>{removeFromBasket?"Remove from Basket":"Add to Basket"}</Button>

            <Text as="h2" fontSize="2xl">{data.title}</Text>
            <Text>{moment(data.createdAt).format("DD/MM/YY")}</Text>

            <p>{data.description}</p>

            <Box margin={"10"}>
                <ImageGallery items={images} />;
            </Box>
        </div>
    )
}

export default ProductDetail