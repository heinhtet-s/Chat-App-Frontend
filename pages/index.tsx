import { dehydrate, QueryClient, UseQueryResult } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import AxioFetch from "../services/Fetch";
import useFetchQuery from "../services/GetRequest";
import styles from "../styles/Home.module.css";
import ReactFlagsSelect from "react-flags-select";
import useDarkMood from "../hook/useDarkMood";
import DefaultImage from "../assets/images/person1.png";
import { BsFacebook } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import ChatListContainer, {
  FetchChatItemType,
} from "../components/ChatList/ChatListContainer";
import { useSelector } from "react-redux";
import ChatRoomContainer from "../components/ChatRoom/ChatRoomContainer";
import usePostQuery from "../services/PostRequest";
// export const getServerSideProps = async () => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(["test"], () => AxioFetch("todos/1"));
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
export type FetchType = {
  completed: boolean;
  id: number;
  title: string;
  userId: string;
};
const Home: NextPage = () => {
  const [colorTheme, setTheme] = useDarkMood();
  // const [selected, setSelected] = useState<string>("US");
  // const ChooseCon = (code: string) => {
  //   setSelected(code);
  // };
  // const {
  //   isLoading,
  //   isFetching,
  //   data: depositData,
  //   isError,
  //   isSuccess,
  //   error,
  // } = useFetchQuery<FetchType>("todos/1", "test");
  // console.log(depositData, "depositData");
  const [showMainChat, setShowMainChat] = useState<boolean>(false);
  const changeDark = (): void => {
    console.log("jefjwo");
    setTheme(colorTheme);
    console.log(colorTheme);
  };
  const data: FetchChatItemType = useSelector(
    (state: any) => state.ChatSlice.data
  );
  console.log(data);
  return (
    <>
      <div className="dark:[color-scheme:dark]">
        <div
          className={` flex dark:bg-gray-900 h-screen overflow-hidden dark:text-slate-100`}
        >
          <ChatListContainer
            showMainChat={showMainChat}
            setShowMainChat={setShowMainChat}
          />
          {data && Object.keys(data).length > 0 ? (
            <>
              <ChatRoomContainer
                data={data}
                showMainChat={showMainChat}
                setShowMainChat={setShowMainChat}
              />
              <div className="h-full basis-1/4  lg:block hidden ">
                <div className="flex cloumn flex-col justify-center items-center mt-5">
                  <div className="w-25 h-25  rounded-full mr-2">
                    <Image
                      src={DefaultImage}
                      width="100%"
                      height="100%"
                      className="object-cover"
                      alt=""
                    />
                  </div>
                  <p className="font-bold "> Ma Ma Lay Thiri</p>
                  <p className="text-sm opacity-80"> Active Now</p>
                  <div className="flex items-center space-x-7 mt-5">
                    <div>
                      <button className=" cursor-pointer flex  mb-1 justify-center items-center w-9 h-9 rounded-full dark:bg-gray-700">
                        <BsFacebook className="text-xl" />
                      </button>
                      <p className="text-sm">Profile</p>
                    </div>
                    <div>
                      <button className=" cursor-pointer flex mb-1 justify-center items-center w-9 h-9 rounded-full dark:bg-gray-700">
                        <MdNotifications className="text-xl" />
                      </button>
                      <p className="text-sm">Mute</p>
                    </div>
                    <div>
                      <button className=" cursor-pointer flex mb-1 justify-center items-center w-9 h-9 rounded-full dark:bg-gray-700">
                        <AiOutlineSearch className="text-xl" />
                      </button>
                      <p className="text-sm">Search</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full hidden md:basis-3/4 md:flex justify-center items-center ">
              <p className="text-2xl"> No Chat found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
