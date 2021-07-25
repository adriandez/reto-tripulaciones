import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosAuth = (route,data,token) => {

  const [res, setRes] = useState();
  useEffect(() => {
    const postBackend = async (route, data, token) => {
      const dataRes = await axios.post(route, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRes(dataRes);
    };
    if (route && data && token) postBackend(route, data, token);
  }, [route, data, token]);
  return res;
};

export default useAxiosAuth;
