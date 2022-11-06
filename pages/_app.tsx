import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { useEffect, useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// const Login = dynamic(() => import("../components/login/login"), {
//   ssr: false,
// });

import { IsLogin } from "../helper/IsLogin";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }
  }, []);
  const isLoginData = IsLogin();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <div>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}
export default MyApp;
