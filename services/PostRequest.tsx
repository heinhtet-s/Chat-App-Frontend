import { useMutation } from "@tanstack/react-query";
import { request } from "./Axios-utilies";
export default function usePostQuery(url: string, others = {}, file = false) {
  let key: string | null = "";
  if (typeof window !== "undefined") {
    key = localStorage.getItem("token");
  }
  let headers: {} = "";
  if (file) {
    headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      authorization: "Bearer " + key,
    };
  } else {
    headers = {
      Accept: "application/json",
      authorization: "Bearer " + key,
    };
  }
  return useMutation(
    async ([data, pathUrl = ""]: any) => {
      const response = await request({
        url: `${url}${pathUrl}`,
        method: "post",
        data,
        headers,
      });
      // if (response?.data?.status !== "success") {
      //   throw new Error(response);
      // }
      return response;
    },
    {
      ...others,
    }
  );
}
