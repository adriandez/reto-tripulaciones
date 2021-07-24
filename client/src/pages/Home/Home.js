import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCookie from "../../hooks/useCookie";
import GoogleLogin from "react-google-login";
import useAxiosPost from "../../hooks/useAxiosPost";

import "./Home.scss";

const Home = () => {
  const cookie = useCookie();
   const [route] = useState("/auth/googleLogin");
   const [google, setGoogle] = useState();
   const response = useAxiosPost(route, google);

  useEffect(() => {
    if (cookie) {
      console.log(cookie);
      if (cookie.data.auth) {
        window.location = "/map";
      }
    }
  }, [cookie]);

  const responseGoogle = async (respuesta) => {
    try {
      setGoogle({token: respuesta.tokenId});
    } catch (err) {
      console.log(err);
    }
  };

  const googleLogin = () => {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GG_API}
        buttonText="Acceder con Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    );
  };

  useEffect(() => {
  if (response) console.log(response);
  }, [response]);

  return (
    <section className="Home">
      <h3>Logo</h3>
      <p> Slogan fuga nostrum dolores eligendi alias eos natus voluptatibus!</p>
      {googleLogin()}
      <Link to="/signin">
        <button>Acceder con tu cuenta</button>
      </Link>
      <Link to="/signup">¿No tienes cuenta? Regístrate</Link>
    </section>
  );
};

export default Home;
