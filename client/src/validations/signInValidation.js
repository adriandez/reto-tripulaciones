import * as yup from "yup";

const signInValidation = yup.object().shape({
  email: yup.string().email().required("Ingresa tu cuenta de correo"),
  password: yup
    .string()
    .required("Ingresa tu contraseña"),
});

export default signInValidation;
