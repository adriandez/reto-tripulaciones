import "./Footer.scss";
import mapaMenu from  "../../img/mapaMenu.png";
import profileMenu from  "../../img/profileMenu.png";
import recordatorioMenu from  "../../img/recordatorioMenu.png";
import resenasMenu from  "../../img/resenasMenu.png";






const Footer = () => {
  return (
    <footer className="Footer">
 
 <img src={mapaMenu}></img>
 <img src={resenasMenu}></img>

 <img src={recordatorioMenu}></img>
 <img src={profileMenu}></img>

 
      
    </footer>
  );
};

export default Footer;
