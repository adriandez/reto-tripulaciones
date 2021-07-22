import "./SignUp.scss";
import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  const [register, setRegister] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      name: e.target.name.value,
      password: e.target.password.value,
      email: e.target.email.value,
    };

    setRegister(obj);
 
 

    let registerUser = await axios.post("/auth/createUser", obj);

     alert("usuario registrado")
     window.location = "/signin";

  };

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
      <label> Name:</label>

      <input type="text" name="name" />

      <label> Email: </label>

      <input type="email" name="email" />

      <label> Password: </label>

      <input type="password" name="password" />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
