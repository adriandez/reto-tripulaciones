import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPost from "../../hooks/useAxiosPost";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import useCookie from "../../hooks/useCookie";

import "./SignIn.scss";

const SignIn = () => {
  const cookie = useCookie();

  useEffect(() => {
    if (cookie) {
      console.log(cookie);
      if (cookie.data.auth) {
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
    // formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    setSingIn(data);
    e.target.reset();
  };

  return (
    <>
      <Link to="/home">
        <BiArrowBack />
      </Link>
      <form className="SignIn" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="Username"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="Password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/,
            })}
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default SignIn;
