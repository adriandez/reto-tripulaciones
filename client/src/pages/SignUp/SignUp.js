import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPost from "../../hooks/useAxiosPost"
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import useCookie from "../../hooks/useCookie";

import "./SignUp.scss";

const SignUp = () => {

  const cookie = useCookie();

  useEffect(() => {
    if (cookie) {
      console.log(cookie);
      if (cookie.data.auth) {
        window.location = "/map";
      }
    }
  }, [cookie]);

  const [route] = useState("/auth/createUser");
  const [signUp, setSingUp] = useState();
  const response = useAxiosPost(route, signUp);

  if (response !==undefined && response.status===200) window.location = "/signin";

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    setSingUp(data);
    e.target.reset();
  };

  return (
    <>
      <Link to="/home">
        <BiArrowBack />
      </Link>
      <form className="SignUp" onSubmit={handleSubmit(onSubmit)}>
        <label> Name:</label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true })}
        />
        <label> Email: </label>
        <input
          type="email"
          name="email"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        <label> Password: </label>
        <input
          type="password"
          name="password"
          {...register("password", {
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/,
          })}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
