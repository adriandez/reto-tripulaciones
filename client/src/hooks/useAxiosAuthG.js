import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosAuthG = (token) => {
  const [resp, setRes] = useState();
  useEffect(() => {
    const postBackend = async (token) => {
      const dataRes = await axios.get("/aseos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRes(dataRes);
    };
    if (token) postBackend(token);
  }, [token]);
  return resp;
};

export default useAxiosAuthG;
