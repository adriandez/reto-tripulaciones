import { useState, useEffect } from "react"
import Cookies from "universal-cookie";
import axios from "axios"

const cookies = new Cookies();

const useCookie = (route, data) => {
  const [response, setResponse] = useState();
  let checkLogin = cookies.get("reto");
  useEffect(() => {
    const postBackend = async (data) => {
      const cookieToken = await axios.post("/auth/checkToken", data);
      setResponse(cookieToken);
    };
    if (checkLogin) postBackend({ token: checkLogin });
  }, [checkLogin]);
  return response;
};

export default useCookie;