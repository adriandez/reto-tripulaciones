import * as yup from "yup";

const signUpValidation = yup.object().shape({
  name: yup.string().required("Ingresa tu nombre"),
  email: yup.string().email().required("Ingresa una cuenta de correo"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 charcteres.")
    .max(12, "La contraseña no debe tener más de 12 charcteres.")
    .required("Ingresa una contraseña"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben ser iguales."),
});

export default signUpValidation;
