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
  const [ header, setHeader ] = useState();
  const response = useAxiosBearer(header);
  const [ random, setRandom ] = useState();
  const [ route, setRoute ] = useState();
  const [cookie, setCookie] = useState();
  const [cookie2, setCookie2] = useState();
    const [data, setData] = useState();
  const res = useAxiosAuthP(route, data, cookie);
  const resp = useAxiosAuthG(cookie2);

    useEffect(() => {
      let checkingCookie = cookies.get("reto");
      checkingCookie ? setHeader(checkingCookie) : (window.location = "/home");
    }, []);

  useEffect(() => {
    if (response && response.data !== "success") window.location = "/home";
  }, [response]);

  useEffect(() => {
    const test = Math.floor(Math.random() * 10);
    setRandom(test);
  }, [res]);

  const Users = () => {
    setCookie(cookies.get("reto"));
    setData({user_ID:random})
    setRoute("/user");
  };

  const Aseos = () => {
    setCookie2(cookies.get("reto"));
  }

  return (
    <section className="Home">
 
      <Search/>
      <Footer/>
      <Details/> 
    </section>
  );
};

export default Map;
