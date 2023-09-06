import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { validate as validationSchema } from "./validations";
import { loginFetch } from '../../api';
import { useAuth } from '../../../Contexts/AuthContext';

function SignIn() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await loginFetch(values);
        login(loginResponse.data);
      }
      catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    }
  })
  return (
    <div>
      <Flex margin={"5"} justifyContent={"center"}>
        <Box border="1px dashed gray" borderRadius={"15"} px="45" py="25">
          <Box>
            <Heading textAlign={"center"}>Sign In</Heading>
          </Box>
          <Box mt="4">
            {formik.errors.general && (
              <Alert status="error"><AlertIcon /><AlertTitle>Error!</AlertTitle><AlertDescription>{formik.errors.general}</AlertDescription></Alert>
            )}
          </Box>
          <Box mt="10">
            <form onSubmit={formik.handleSubmit}>
              <FormControl mt="4">
                <FormLabel>E-Mail</FormLabel>
                <Input name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                ></Input>
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                ></Input>
              </FormControl>
              <FormControl mt="5">
                <Button type="submit" colorScheme='orange' width={"full"}>Sign In</Button>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default SignIn