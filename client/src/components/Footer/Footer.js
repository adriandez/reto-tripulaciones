import "./Footer.scss";
import mapaMenu from "../../img/mapaMenu.png";
import profileMenu from "../../img/profileMenu.png";
import recordatorioMenu from "../../img/recordatorioMenu.png";
import resenasMenu from "../../img/resenasMenu.png";
import Cookies from "universal-cookie";

import { Link } from "react-router-dom";

const cookies = new Cookies();

const Footer = () => {

  const Logout = () => {
    cookies.remove("reto");
    window.location = "/home";
  };

  return (
    <footer className="Footer">
      <Link to="/search">
        <img src={mapaMenu} alt="Mapa"></img>
      </Link>
      <Link to="/home">
        <img src={resenasMenu} alt="Reseñas"></img>
      </Link>
      <Link to="/home">
        <img src={recordatorioMenu} alt="Recordatorio"></img>
      </Link>
      <Link onClick={Logout} to="/home">
        <img src={profileMenu} alt="Perfil de usuario"></img>
      </Link>
    </footer>
  );
};

export default Footer;
