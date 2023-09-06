import * as yup from "yup";

export const validate=yup.object().shape({
    email: yup.string().email("Mail format not correct").required("Mail is required field!"),
    password: yup.string().min(3, "Password must be least 3 character!").required("Password is required field!")
})