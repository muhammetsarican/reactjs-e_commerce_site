import * as yup from "yup";
export const validate=yup.object().shape({
    title:yup.string().required(),
    description:yup.string().min(10, "Description must be at least 10 character!").required(),
    price:yup.string().required(),
})