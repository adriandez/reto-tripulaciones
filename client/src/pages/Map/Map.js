import { useState, useEffect } from "react";
import useAxiosBearer from "../../hooks/useAxiosBearer";
import Cookies from "universal-cookie";

import Search from "../../pages/Search";
import Footer from "../../components/Footer";


import "./Map.scss";

const cookies = new Cookies();

const Logout = () => {
  cookies.remove("reto");
  window.location = "/home";
};

const Map = () => {
  const [header, setHeader] = useState();
  const response = useAxiosBearer(header);

  useEffect(() => {
    let checkingCookie = cookies.get("reto");
    checkingCookie ? setHeader(checkingCookie) : (window.location = "/home");
  }, []);

  useEffect(() => {
    if (response && response.data !== "success") window.location = "/home";
  }, [response]);


  return (
    <section className="Home">
      <Search />
      <Footer />

      {/*      <Details/>  */}
    </section>
  );
};

export default Map;
