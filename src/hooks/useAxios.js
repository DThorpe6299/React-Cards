import { useState, useEffect } from "react";
import axios from "axios";

function useAxios(url) {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (path = "") => {
    try {
      const response = await axios.get(url + path);
      setResponseData(response.data);
      setLoading(false);
      console.log(url + path)
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };


  return {responseData, fetchData, loading, error};
}

export default useAxios;
