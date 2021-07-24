import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosBearer = (token) => {
  const [response,setResponse] = useState()
  useEffect(() => {
    const postBackend = async (token) => {
      const dataRes = await axios.post("/auth/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse(dataRes);
    };
    if (token) postBackend(token);
  }, [token]);
  return response
};

export default useAxiosBearer;
