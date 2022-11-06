import useFetchQuery from "../services/GetRequest";

export const useUserInfo = () => {
    return useFetchQuery(
        "api/get-login-user",
        "getUserInfo",
        {
            refetchOnMount: false,
        }
    );
}