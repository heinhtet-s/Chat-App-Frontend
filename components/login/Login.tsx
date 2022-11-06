import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import usePostQuery from "../../services/PostRequest";
const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const storeEmailHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };
  const storePasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };
  const PasswordOpenHandler = () => {
    setShowPass(false);
  };
  const PasswordCloseHandler = () => {
    setShowPass(true);
  };
  const { isLoading: depositLoading, mutate: sendMutate } = usePostQuery(
    `api/user/login`,
    {
      onSuccess: (data: any) => {
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("id", data?.data?._id);
      },
      onError: (error: any) => {
        alert(error.message);
      },
    }
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMutate([
      {
        email: email,
        password: password,
      },
    ]);
  };

  return (
    <div className="w-full h-screen  flex justify-center items-center bg-violet-400">
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-96">
        <h3 className=" text-3xl dark:text-white mb-5 drop-shadow-md">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 "
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow-sm appearance-none border border-slate-300 w-full  rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={email}
              onChange={storeEmailHandler}
              placeholder=" Email "
            />
          </div>
          <div className="mb-3 ">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              {showPass ? (
                <FiEye
                  className="absolute  top-1/2 right-2 text-xl cursor-pointer  -translate-y-1/2"
                  onClick={PasswordOpenHandler}
                />
              ) : (
                <FiEyeOff
                  className="absolute  top-1/2 right-2 text-xl cursor-pointer text-gray-700 -translate-y-1/2"
                  onClick={PasswordCloseHandler}
                />
              )}

              {/* <IoEyeSharp /> */}

              <input
                className="shadow-sm appearance-none border border-slate-300  rounded w-full py-3  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                value={password}
                onChange={storePasswordHandler}
                type={showPass ? "password" : "text"}
                placeholder="password"
              />
            </div>
          </div>
          <div className=" w-full">
            <button
              type="submit"
              className={`bg-main ease-in duration-300  w-full shadow-sm hover:bg-mainhover py-2 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline bg-violet-600  `}
            >
              Submit
            </button>
            {/* <button onClick={() => { setOpen(false) }} className="bg-main ease-in duration-300  w-full shadow-sm hover:bg-mainhover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                Sign In
                                            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
