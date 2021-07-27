
import TemporaryD from "./DrawerComponent/TemporaryD";
import { Link } from "react-router-dom";

import "./Nav.scss";

const Nav = () => {
  return (
    <nav className="Nav">
      <ul>
        <li className="desktop">
          <Link to="/home">Home</Link>
        </li>
        
        <li className="desktop">
          <Link to="/signup">SignUp</Link>
        </li>
        <li className="desktop">
          <Link to="/signin">SignIn</Link>
        </li>
        <li className="movil">
          <TemporaryD />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
