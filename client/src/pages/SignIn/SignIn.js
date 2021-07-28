import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPost from "../../hooks/useAxiosPost";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import useCookie from "../../hooks/useCookie";
import { yupResolver } from "@hookform/resolvers/yup";
import signInValidation from "../../validations/signInValidation";

import "./SignIn.scss";

const SignIn = () => {
  const cookie = useCookie();

  useEffect(() => {
    if (cookie) {
      if (cookie.data.tutorial) {
        window.location = "/assistant";
      } else {
        window.location = "/map";
      }
    }
  }, [cookie]);

  const [route] = useState("/auth/login");
  const [signIn, setSingIn] = useState();
  useAxiosPost(route, signIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInValidation) });

  const onSubmit = (data, e) => {
    setSingIn(data);
    e.target.reset();
  };

  return (
    <>
      <Link aria-label="Ir hacia atras" to="/home">
        <BiArrowBack />
      </Link>
      <form className="SignIn" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          Email:
          <input type="text" name="Username" {...register("email")} />
          <p>{errors.email?.message}</p>
        </label>
        <label htmlFor="password">
          Contraseña:
          <input type="password" name="Password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </label>
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default SignIn;
