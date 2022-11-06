import Router from "next/router";

export const Logout = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    Router.push("/login");
  }
};
