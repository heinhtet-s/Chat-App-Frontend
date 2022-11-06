import { useState, useEffect } from "react";
export const IsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin(localStorage.getItem("token") !== null);
  }, []);
  return isLogin;
};
