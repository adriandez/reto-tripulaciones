import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosPost = (route, data) => {
  const [response,setResponse] = useState()
  useEffect(() => {
    const postBackend = async (route, data) => {
      const dataRes = await axios.post(route, data);
      setResponse(dataRes);
    };
    if ((route && data)) postBackend(route, data);
  }, [route, data]);
  return response
};

export default useAxiosPost;
