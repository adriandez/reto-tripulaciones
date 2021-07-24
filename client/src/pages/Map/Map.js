import { useState, useEffect } from "react";
import useAxiosBearer from "../../hooks/useAxiosBearer";
import Cookies from "universal-cookie";

import "./Map.scss";

const cookies = new Cookies();

const Logout = () => {
  cookies.remove("reto");
  window.location = "/home";
};

const Map = () => {
  const [ header, setHeader ] = useState();
  const response = useAxiosBearer(header);

  useEffect(() => {
    let checkingCookie = cookies.get("reto");
    checkingCookie? setHeader(checkingCookie) : window.location = "/home";
  }, []);

  useEffect(() => {
    if (response && response.data !== "success") window.location = "/home";
  }, [response]);

  return (
    <section className="Home">
      <h3>Mapa</h3>
      <button onClick={Logout}>LogOut</button>
    </section>
  );
};

export default Map;
