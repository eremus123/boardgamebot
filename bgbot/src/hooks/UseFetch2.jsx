import React, { useState } from "react";

const UseFetch2 = () => {
  const [data, setData] = useState([]);

  const fetchData = async (url) => {
    const res = await fetch(url);
    const resData = await res.json();
    setData(resData);
  };
  return [data, fetchData];
};

export default UseFetch2;
