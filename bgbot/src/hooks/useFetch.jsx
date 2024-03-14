import React from "react";

const useFetch = () => {
  const fetchData = async (url) => {
    const res = await fetch(url);
    const resData = await res.json();
    return resData;
  };
  return fetchData;
};

export default useFetch;
