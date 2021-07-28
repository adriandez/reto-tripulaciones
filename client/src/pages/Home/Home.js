import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCookie from "../../hooks/useCookie";
import GoogleLogin from "react-google-login";
import useAxiosPost from "../../hooks/useAxiosPost";
import LogoChair from "../../img/homeLogo.png"

import "./Home.scss";

const Home = () => {
  const cookie = useCookie();
  const [route] = useState("/auth/googleLogin");
  const [google, setGoogle] = useState();
  const response = useAxiosPost(route, google);

  useEffect(() => {
    if (cookie) {
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
      <div className="weTravel">
      <h1>WeTravel</h1>
      </div>

      <div className="logoChair">
 
 <img src={LogoChair}></img>

      </div>
    <div className="logIn">
    {/* <h2>Logo</h2> */}
    <h3> ¡Encuentra baños accesibles y verificados cerca de tu ruta!</h3>
    <div className="botones">
    <div className="buttonGoogle">
    {googleLogin ()}  
  
   
    <Link to="/signin">
      <button>Acceder con tu email</button>
    </Link>
    </div>
    <div className="Register">
    <h4 id="cuenta">¿No tienes cuenta?<Link to="/signup" id="registro"> Regístrate</Link></h4>
    </div>
    </div>
    </div>
  </section>
  );
};

export default Home;
