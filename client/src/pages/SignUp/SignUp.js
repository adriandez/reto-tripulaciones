import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPost from "../../hooks/useAxiosPost";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import useCookie from "../../hooks/useCookie";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpValidation from "../../validations/signUpValidation"

import "./SignUp.scss";

const SignUp = () => {
  const cookie = useCookie();

  useEffect(() => {
    if (cookie) {
      if (cookie.data.auth) {
        window.location = "/map";
      }
    }
  }, [cookie]);

  const [route] = useState("/auth/createUser");
  const [signUp, setSingUp] = useState();
  const response = useAxiosPost(route, signUp);

  if (response !== undefined && response.status === 200)
    window.location = "/signin";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpValidation) });

  const onSubmit = (data, e) => {
    setSingUp(data);
    e.target.reset();
  };

  return (
    <>
      <Link aria-label="Ir hacia atras" to="/home">
        <BiArrowBack />
      </Link>
      <form className="SignUp" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nombre:
          <input type="text" name="name" {...register("name")} />
          <p>{errors.name?.message}</p>
        </label>
        <label>
          Email:
          <input type="email" name="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </label>
        <label>
          Confirma la contraseña:
          <input type="password" name="password2" {...register("password2")} />
          <p>{errors.password2?.message}</p>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
