import { request } from "./Axios-utilies";
const AxioFetch = async (url: string) => {
  let key: string | null = "";
  if (typeof window !== "undefined") {
    key = localStorage.getItem("token");
  }
  try {
    let response = await request({
      url: url,
      headers: {
        authorization: key,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
export default AxioFetch;
