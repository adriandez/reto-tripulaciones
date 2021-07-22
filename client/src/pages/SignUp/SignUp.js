import "./SignUp.scss";
import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  const [register, setRegister] = useState({});
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clearForm = () => { return ( (e.target.password.value = ""), (e.target.email.value = ""), (e.target.name.value = "")  );  };

    if (!e.target.name.value) {
      clearForm();
      setMessage("Introduzca un nombre de usuario");
    } else if (!e.target.email.value) {
      clearForm();
      setMessage("Introduzca un email de usuario");
    } else if (!e.target.password.value) {
      clearForm();
      setMessage("Introduzca un password de usuario");
    } else if (
      e.target.email.value &&
      e.target.password.value &&
      e.target.name.value
    ) {

      let regexEmail =   /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
 
      let testEmail = regexEmail.test(`${e.target.email.value}`);
 
      let regexPassword=  /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/     

      let testPassword = regexPassword.test(`${e.target.password.value}`);

      console.log(testEmail)
      console.log(testPassword)
      

      if (testEmail === true && testPassword ===true) {
        let obj = {
          name: e.target.name.value,
          password: e.target.password.value,
          email: e.target.email.value,
        };

        setRegister(obj);

      await axios.post("/auth/createUser", obj);

        setMessage("usuario registrado");
        window.location = "/signin";

      } else if(testEmail === false ){
        setMessage("Introduzca un email correcto");
      }
      else if(testPassword === false ){
        setMessage("El password debe contener 1 mayúscula,1 minúscula y un dígito al menos");
      }
    }
      

   
  };

  return (
    <div>
      <div>
        <form className="SignUp" onSubmit={handleSubmit}>
          <label> Name:</label>

          <input type="text" name="name" />

          <label> Email: </label>

          <input type="email" name="email" />

          <label> Password: </label>

          <input type="password" name="password" />

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="alertMessage">{message ? message : ""} </div>
    </div>
  );
};

export default SignUp;
