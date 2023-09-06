import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from "formik"
import { validate as validationSchema } from "./validations"
import { fetchRegister } from '../../api'
import { useAuth } from '../../../Contexts/AuthContext'

function SignUp() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const response = await fetchRegister(values);
        login(response.data);
      }
      catch (err) {
        bag.setErrors({ general: err.response.data.message });
      }
    }
  })

  return (
    <div>
      <Flex mt="10" justifyContent="center" alignItems={"center"}>
        <Box pt="10" border={"1px dotted gray"} padding={"10"} borderRadius={"10"}>
          <Box>
            <Heading textAlign={"center"}>Sign Up</Heading>
            <hr />
          </Box>
          <Box my={"5"} borderRadius={"5"}>
            {formik.errors.general && (<Alert status='error'><AlertIcon /><AlertTitle>Error!</AlertTitle><AlertDescription>{formik.errors.general}</AlertDescription></Alert>)}
          </Box>
          <Box my="10" textAlign="center">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
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
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                ></Input>
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input name="passwordConfirm"
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                ></Input>
              </FormControl>

              <Button mt="10" width={"full"} type='submit' colorScheme='green'>Sign Up</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default SignUp