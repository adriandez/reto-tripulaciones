import "./Footer.scss";
import mapaMenu from  "../../img/mapaMenu.png";
import profileMenu from  "../../img/profileMenu.png";
import recordatorioMenu from  "../../img/recordatorioMenu.png";
import resenasMenu from  "../../img/resenasMenu.png";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Footer = () => {

  return (
    <footer className="Footer">
      <Link to="/map">
        {" "}
        <img src={mapaMenu}></img>
      </Link>
      <Link to="/logout">
        {" "}
        <img src={resenasMenu}></img>
      </Link>
      <Link to="/logout">
        {" "}
        <img src={recordatorioMenu}></img>
      </Link>
      <Link to="/logout">
        {" "}
        <img src={profileMenu}></img>
      </Link>
    </footer>
  );
};

export default Footer;
