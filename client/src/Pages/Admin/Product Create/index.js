import { Alert, Box, Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import { FieldArray, Formik } from 'formik'
import React from 'react'
import { message } from 'antd'
import { fetchPostProduct } from '../../../api'
import { useMutation, useQueryClient } from 'react-query'

function ProductCreate() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(fetchPostProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products")
  })
  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_update" });

    const newValues = { ...values, photos: JSON.stringify(values.photos) };
    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        console.log("Success")
        message.success({ content: "The product successfully created.", key: "product:create", duration: 2 });
      }
    })

  }
  return (
    <div>
      <Flex>
        <Box w={"full"}>
          <Box textAlign={"center"}>
            <Heading>Product Add</Heading>
          </Box>
          <Formik mt={"25"} initialValues={{
            title: "",
            description: "",
            price: "",
            photos: []
          }}
            // validationSchema={validate}
            onSubmit={handleSubmit}>
            {({
              handleSubmit,
              errors,
              touched,
              handleChange,
              handleBlur,
              values,
              isSubmitting,
            }) => (<form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl>
                <FormLabel>
                  Title
                </FormLabel>
                <Input
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                </Input>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Description
                </FormLabel>
                <Input
                  name='description'
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                </Input>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Price
                </FormLabel>
                <Input
                  name='price'
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                </Input>
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
                            // disabled={isSubmitting}
                            ></Input>
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
              <Button type='submit' colorScheme='green' w={"full"}>Save</Button>
            </form>)}</Formik>
        </Box>
      </Flex>
    </div >
  )
}

export default ProductCreate