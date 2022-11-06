import { useQuery } from "@tanstack/react-query";
import { request } from "./Axios-utilies";
export default function useFetchQuery<FetchType>(
  url: string,
  name: string | [string, string],
  others: {} = {}
) {
  let key: string | null = "";
  if (typeof window !== "undefined") {
    key = "Bearer " + localStorage.getItem("token");
  }
  return useQuery(
    [name],
    async ({ queryKey }): Promise<FetchType> => {
      console.log("gg", queryKey);
      const response = await request({
        url: `${url}${queryKey[1] ? queryKey[1] : ""} `,
        headers: { authorization: key, Accept: "application/json" },
      });
      return response.data;
    },
    {
      onError: (data: any) => {
        if (data?.response?.data?.message) {
          console.log(data?.response?.data?.message);
        }
      },
      ...others,
    }
  );
}
