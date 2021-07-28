import { useState, useEffect } from "react";
import useAxiosBearer from "../../hooks/useAxiosBearer";
import Cookies from "universal-cookie";
import useAxiosAuthP from "../../hooks/useAxiosAuthP";
import useAxiosAuthG from "../../hooks/useAxiosAuthG";
import Search from "../../pages/Search";

import Footer from "../../components/Footer";
import Details from "../../pages/Details";

import "./Map.scss";

const cookies = new Cookies();

const Logout = () => {
  cookies.remove("reto");
  window.location = "/home";
};

const Map = () => {
  const [header, setHeader] = useState();
  const response = useAxiosBearer(header);
  const [tutorialBoolean, setTutorialBoolean] = useState();

  useEffect(() => {
    let checkingCookie = cookies.get("reto");
    checkingCookie ? setHeader(checkingCookie) : (window.location = "/home");
  }, []);

  useEffect(() => {
    if (response && response.data)
      setTutorialBoolean(response.data.tutorial);
    if (response && response.tutorial) window.location = "/home";
  }, [response]);

  return (

    <section className="Map">
    <Search tutorialBoolean={tutorialBoolean} />
    <Footer />
    </section>
  );
};

export default Map;
