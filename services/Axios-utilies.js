import axios from "axios";
import { Logout } from "../helper/Logout";

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
export const request = ({ ...options }) => {
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status === 401) {
      //   Logout();
      return;
      // localStorage.clear();
      // navigate("/");
      // window.location.reload(false);
    }
    // console.log(error.response);
    throw error;
  };
  return client(options).then(onSuccess).catch(onError);
};
