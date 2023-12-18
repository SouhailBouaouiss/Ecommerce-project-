import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { axiosInstance } from ".";
import { toast } from "react-toastify";

const useLogic = (fn) => {
  const [data, setData] = React.useState([]);
  useEffect(({ path }) => {
    axiosInstance
      .get(path)
      .then((resp) => {
        const data = resp.data.data;
        return setData(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(error.response.data.message);
      });
  });

  const mappedData = useMemo(() => {
    return data.map(fn);
  });
};
