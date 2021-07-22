import "./SignIn.scss";
import Cookies from "universal-cookie";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import axios from "axios";
import { useState, useEffect } from "react";
import loginService from "../../services/login";
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const cookies = new Cookies();

  useEffect(() => {
    let checkingCookies = cookies.get("myCookie");

    if (checkingCookies) {
      window.location = "/demo";
    } else if (checkingCookies === null) {
      console.log("no hay token");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginService.login({
        username,
        password,
      });

      if (response.status === "false") {
        alert("el usuario no existe");
      } else if (response.status === "true") {
        setUser(response);
        setUsername("");
        setPassword("");

        cookies.set("myCookie", response.token);
        alert("Se ha logueado correctamente");

        window.location = "/demo";
      }
    } catch (e) {}
  };

  const responseGoogle = async (respuesta) => {


    

/*     cookies.set("myCookie", response.token); */

    let googleLogin = {
      name: respuesta.profileObj.name,
      email: respuesta.profileObj.email,
      password: respuesta.profileObj.googleId


    }


    let cookieToken = await axios.post("/auth/googleLogin", googleLogin);
  

    console.log(cookieToken.data.token)

    cookies.set("myCookie", cookieToken.data.token);
    alert("Se ha logueado correctamente");

    window.location = "/demo";

   
  };
  const responseFacebook = (respuesta) => {
    console.log(respuesta);
  };
  const componentClicked = () => {};
  const googleLogin = () => {
    return <GoogleLogin
      clientId="542913183117-959bmc4aiescf3jep1gtt3s7ahjis46v.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />;
  };
  const facebookLogin = () => {
    return  <FacebookLogin
    appId="560421605128839"
    autoLoad={false}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook}
    textButton="Login con FB"
    icon="fa-facebook"
  />;
  };

  return (
    <form className="SignIn" onSubmit={handleLogin}>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          name="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label htmlFor="password">
        {" "}
        Password:{" "}
        <input
          type="password"
          name="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Sign In</button>
      <br></br>
      {googleLogin()}
      <br></br>
      {facebookLogin()}
    </form>
  );
};

export default SignIn;
