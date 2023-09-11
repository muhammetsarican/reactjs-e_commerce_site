import React from 'react';
import { FieldArray, Formik, useFormik } from "formik";
import { Box, Flex, FormControl, FormLabel, Heading, Input, Textarea, Button, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchProduct, fetchPutProduct } from '../../../api';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Alert, message } from 'antd';
import { validate } from './validations';
function ProductDetail() {
    const { product_id } = useParams()
    const { isLoading, data, error } = useQuery(["admin:product", product_id], () => fetchProduct(product_id));

    if (isLoading) return "Loading...";

    if (error) return `An error has occured ${error.message}`;

    console.log(data)
    return (
        <div>
            <Flex>
                <Box width={"full"}>
                    <Box textAlign={"center"}>
                        <Heading mt={"25"}>{data.title}</Heading>
                    </Box>
                    <Box>
                        <Formik mt={"25"} initialValues={{
                            title: data.title,
                            description: data.description,
                            price: data.price,
                            photos: data.photos
                        }}
                            validationSchema={validate}
                            onSubmit={ async (values, bag) => {
                                message.loading({content:"Loading...", key: "product_update"})
                                try{
                                    const fetchResponse= await fetchPutProduct(values, product_id);
                                    if(fetchResponse) message.success({content:"The product successfully updated.", key:"product_update", duration:2})
                                }
                                catch{
                                    message.error({content:"The product not updated.", key:"product_update", duration:2});
                                }
                            }}>
                            {({
                                handleSubmit,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                values,
                                isSubmitting,
                            }) => (<form onSubmit={handleSubmit}>
                                <FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        name='title'
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                        isInvalid={touched.title && errors.title}
                                    ></Input>
                                    {touched.title&&errors.title&&(
                                        <Text color={"red.500"}>{errors.title.charAt(0).toUpperCase()+errors.title.slice(1)}</Text>
                                    )}
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        name='description'
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                        isInvalid={touched.description && errors.description}
                                    ></Textarea>
                                    {touched.description&&errors.description&&(
                                        <Text color={"red.500"}>{errors.description.charAt(0).toUpperCase()+errors.description.slice(1)}</Text>
                                    )}
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Price</FormLabel>
                                    <Input
                                        name='price'
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                        isInvalid={touched.price && errors.price}
                                    ></Input>
                                    {touched.price&&errors.price&&(
                                        <Text color={"red.500"}>{errors.price.charAt(0).toUpperCase()+errors.price.slice(1)}</Text>
                                    )}
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Photos</FormLabel>
                                    <FieldArray
                                        name='photos'
                                        render={(arrayHelpers) => (
                                            <>
                                                {
                                                    values.photos && values.photos.map((photo, index) => (
                                                        <div key={index} style={{ display: "flex" }}>
                                                            <Input
                                                                name={`photos.${index}`}
                                                                value={photo}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled={isSubmitting}></Input>
                                                            <Button ml={2} colorScheme='red' variant={"outline"} onClick={() => arrayHelpers.remove(index)} disabled={isSubmitting}>Delete</Button>
                                                        </div>
                                                    ))
                                                    || (
                                                        <Alert>No Photos</Alert>
                                                    )
                                                }
                                                <Button onClick={() => arrayHelpers.push("")} disabled={isSubmitting}>Add a Photo</Button>
                                            </>
                                        )}
                                    ></FieldArray>
                                </FormControl>
                                <Button w="full" type='submit' colorScheme='green' variant={"outline"} isLoading={isSubmitting}>
                                    Update
                                </Button>
                            </form>)}

                        </Formik>
                    </Box>
                </Box>
            </Flex>
        </div>
    )
}

export default ProductDetail