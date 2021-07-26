import { useState, useEffect } from "react";
import useAxiosBearer from "../../hooks/useAxiosBearer";
import Cookies from "universal-cookie";
import Footer from "../../components/Footer"
import Search from "../../pages/Search"


import "./Map.scss";

const cookies = new Cookies();



const Map = () => {
  const [ header, setHeader ] = useState();
  const response = useAxiosBearer(header);

    useEffect(() => {
      let checkingCookie = cookies.get("reto");
      checkingCookie ? setHeader(checkingCookie) : (window.location = "/home");
    }, []);

  useEffect(() => {
    if (response && response.data !== "success") window.location = "/home";
  }, [response]);


  return (
    <>
      <section className="Map">
        <Search />
        <Footer />
      </section>
    </>
  );
};

export default Map;
