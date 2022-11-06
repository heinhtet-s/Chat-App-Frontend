import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import useFetchQuery from "../../services/GetRequest";
import ChatListItem from "./ChatListItem";
import ChatListNav from "./ChatListNav";
import { add } from "../../redux/slices/ChatSlice";
import { BiConversation } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import ChatConversactionList from "./ChatConversactionList";
import ChatFriendList from "./ChatFriendList";
export type FetchChatItemType = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: {
    _id: string;
    name: string;
    email: string;
    pic: string;
    isAdmin: boolean;
    __v: 0;
  }[];
  latestMessage?: {
    _id: string;
    content: string;
    sender: {
      _id: string;
      name: string;
      email: string;
    };
    chat: string;
    createdAt: string;
    updatedAt: string;
    readBy?:
      | {
          _id: string;
          name: string;
          email: string;
        }[]
      | [];

    __v: 0;
  };
  groupAdmin: {
    _id: string;
    name: string;
    email: string;
    pic: string;
    isAdmin: false;
    __v: 0;
  };
  __v: 0;
  createdAt: string;
  updatedAt: string;
  friendMood?: boolean;
} | null;
type ChatListContainerProps = {
  showMainChat: boolean;
  setShowMainChat: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChatListContainer = ({
  showMainChat,
  setShowMainChat,
}: ChatListContainerProps) => {
  const [chatListTag, setChatListTag] = React.useState<
    "conversaction" | "friends"
  >("conversaction");

  const dispatch = useDispatch();
  const changeTagHandler = (tag: "conversaction" | "friends") => {
    setChatListTag(tag);
    dispatch(add({}));
  };
  return (
    <div
      className={`h-full grow md:block md:basis-1/4 sm:basic-full pr-1 border-r pt-5 pl-5 border-gray-700 ${
        showMainChat && "hidden"
      } `}
    >
      <ChatListNav />
      <div className="dark:bg-gray-700 rounded-3xl overflow-hidden mt-5 relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 border-none outline-none dark:bg-gray-700 "
        />
        <AiOutlineSearch className="absolute top-2.5 left-3 text-xl" />
      </div>
      <div className="flex w-full rounded-md shadow-sm mt-5 pr-7 " role="group">
        <button
          type="button"
          onClick={() => changeTagHandler("conversaction")}
          className={`flex  justify-center w-1/2 items-center py-2 px-4 text-sm font-medium text-gray-900 rounded-l-lg border border-gray-800 hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 ${
            chatListTag === "conversaction"
              ? " dark:bg-gray-700  bg-white"
              : "dark:bg-gray-900 bg-slate-200"
          }`}
        >
          <FaUserFriends className="mr-2" />
          conversation
        </button>
        <button
          type="button"
          onClick={() => {
            changeTagHandler("friends");
          }}
          className={`flex justify-center w-1/2 items-center py-2 px-4 text-sm font-medium text-gray-900 rounded-r-md border border-gray-800 hover:bg-gray-100 hover:text-blue-700  dark:border-gray-600
           dark:text-white dark:hover:text-white dark:hover:bg-gray-600 ${
             chatListTag === "friends"
               ? " dark:bg-gray-700  bg-white"
               : "dark:bg-gray-900 bg-slate-200"
           }`}
        >
          <BiConversation className="mr-2" />
          Friends
        </button>
      </div>
      {chatListTag === "conversaction" ? (
        <ChatConversactionList setShowMainChat={setShowMainChat} />
      ) : (
        <ChatFriendList setShowMainChat={setShowMainChat} />
      )}
    </div>
  );
};
export default ChatListContainer;
