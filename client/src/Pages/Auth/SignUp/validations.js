import * as yup from "yup";

export const validate=yup.object().shape({
    email: yup.string().email("Please enter a valid email!").required("Email is required field!"),
    password: yup.string().min(5, "Password must be at least 5 character!").required("Password is required field!"),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Passwords not matching!").required("Password is required field!"),
})