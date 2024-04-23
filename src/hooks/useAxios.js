import { useState, useEffect } from "react";
import axios from "axios";

function useAxios(url, path = "") {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(url + path);
      setResponseData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, path]); // Include path as a dependency

  return [responseData, fetchData, loading, error];
}

export default useAxios;
