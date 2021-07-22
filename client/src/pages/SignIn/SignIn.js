import "./SignIn.scss";
import Cookies from "universal-cookie";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useState, useEffect } from "react";
import loginService from "../../services/login";

const cookies = new Cookies();

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let checkingCookies = cookies.get("myCookie");

    if (checkingCookies) {
      window.location = "/demo";
    } else if (checkingCookies === null) {
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const clearForm = () =>{ return event.target.Password.value ="" ,event.target.Username.value="" }

    if (event.target.Username.value === "") {
      setMessage("No puede estar vacio el email");
      clearForm();
    } else if (event.target.Password.value === "") {
      setMessage("Password no puede estar vacio");
      clearForm();

    } else if (
      event.target.Username.value !== 0 &&
      event.target.Password.value !== 0
    ) {
      const response = await loginService.login({
        username,
        password,
      });

      console.log(response);

      if (response.status === "false") {
        setMessage("El email o password es erróneo");
 
        clearForm();

      } else if (response.status === "true") {
        setUser(response);
        setUsername("");
        setPassword("");
        let prueba = cookies.set("myCookie", response.token);
        clearForm();

        setMessage("Se ha logueado correctamente");

        window.location = "/demo";
      }
    }
  };

  const responseGoogle = async (respuesta) => {
    try {
      let googleLogin = {
        name: respuesta.profileObj.name,
        email: respuesta.profileObj.email,
        password: respuesta.profileObj.googleId,
      };

      let cookieToken = await axios.post("/auth/googleLogin", googleLogin);

      const cookies = new Cookies();
      let metercookie = await cookies.set("myCookie", cookieToken.data.token);

      window.location.reload();
    } catch {}
  };
  const responseFacebook = async (respuesta) => {
    let FacebookLogin = {
      name: respuesta.name,
      email: respuesta.email,
      password: respuesta.id,
    };

    let cookieToken = await axios.post("/auth/facebookLogin", FacebookLogin);

    const cookies = new Cookies();
    let metercookie = await cookies.set("myCookie", cookieToken.data.token);

    window.location.reload();
  };
  const componentClicked = () => {};
  const googleLogin = () => {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GG_API}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    );
  };
  const facebookLogin = () => {
    return (
      <FacebookLogin
        appId={process.env.REACT_APP_FB_API}
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        textButton="Login con FB"
        icon="fa-facebook"
      />
    );
  };

  return (
    <div>
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
        <p></p>

        {googleLogin()}
        <br></br>
        {facebookLogin()}
      </form>
      <div className="alertMessage">{message ? message : ""} </div>
    </div>
  );
};

export default SignIn;
