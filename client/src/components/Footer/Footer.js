import "./Footer.scss";
import mapaMenu from  "../../img/mapaMenu.png";
import profileMenu from  "../../img/profileMenu.png";
import recordatorioMenu from  "../../img/recordatorioMenu.png";
import resenasMenu from  "../../img/resenasMenu.png";
import { Link } from "react-router-dom";
 






const Footer = () => {
  return (
    <footer className="Footer">
 

 <Link to="/map"> <img src={mapaMenu}></img></Link>
 <Link to="/reviews"> <img src={resenasMenu}></img></Link>
 <Link to="/alarm"> <img src={recordatorioMenu}></img></Link>
 <Link to="/myprofile"> <img src={profileMenu}></img></Link>

 
      
    </footer>
  );
};

export default Footer;
