import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DefaultImage from "../../assets/images/person1.png";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ChatInput from "./ChatInput";
import OtherMessage from "./OtherMessage";
import ChatRoomHeader from "./ChatRoomHeader";
import UserMessage from "./UserMessage";
import { FetchChatItemType } from "../ChatList/ChatListContainer";
import useFetchQuery from "../../services/GetRequest";
import { useDispatch } from "react-redux";
import { add } from "../../redux/slices/ChatSlice";
const { io, Socket } = require("socket.io-client");
type ChatRoomContainerProps = {
  data: FetchChatItemType;
  showMainChat: boolean;
  setShowMainChat: React.Dispatch<React.SetStateAction<boolean>>;
};
export type MessageDataType = {
  content: string;
  chat: {
    _id: string;
    name: string;
    isGroupChat: boolean;
    users: string[];
    latestMessage: "string";
  };
  sender: {
    _id: string;
    name: string;
    email: string;
  };
  readBy?: {
    _id: string;
    name: string;
    email: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
var socket: any;
const ChatRoomContainer = ({
  data,
  showMainChat,
  setShowMainChat,
}: ChatRoomContainerProps) => {
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [messageData, setMessageData] = React.useState<MessageDataType[]>([]);
  const {
    isLoading,
    isFetching,
    data: message,
    isError,
    isSuccess,
    error,
    refetch,
  } = useFetchQuery<any>(`api/message/${data?._id}`, `message${data?._id}`, {
    enabled: false,
  });
  const {
    data: chatRoomData,
    isFetching: isChatRoomFetching,
    isError: chatError,
    isSuccess: chatFetchSuccess,
    error: chatFetchError,
    refetch: refreshChatFetch,
  } = useFetchQuery<any>(`api/chat/${data?._id}`, `chat${data?._id}`, {
    enabled: false,
  });
  const id: string | null = localStorage.getItem("id");
  useEffect(() => {
    if (isSuccess) {
      console.log("ggeio", message);
      setMessageData(message);
    }
    if (chatFetchSuccess) {
      console.log("chatRoomData", chatRoomData);
      if (chatRoomData?._id) {
        const chatName = chatRoomData.users?.filter(
          (user: any) => user._id !== id
        )[0]?.name;
        dispatch(add({ ...chatRoomData, chatName }));
      }
    }
  }, [isFetching, isChatRoomFetching]);
  useEffect(() => {
    setMessageData([]);
    if (!data?.friendMood) {
      console.log("gjoegjo");
      refetch();
      socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
        withCredentials: false,
      });
      socket.emit("setup", id);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("message recieved", (receiveMessage: MessageDataType) => {
        if (receiveMessage.chat._id === data?._id) {
          setMessageData((prev: MessageDataType[]) => [
            ...prev,
            receiveMessage,
          ]);
        }
      });
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    } else {
      console.log("gg");
      refreshChatFetch();
    }
  }, [data]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  // useEffect(() => {

  // }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messageData]);
  console.log(messageData, "messageData");
  return (
    <div
      className={`md:basis-3/4 lg:basis-2/4    sm:flex border-r h-screen   overflow-y-scroll  flex-col justify-between  border-gray-700 overflow-x-hidden 
      ${showMainChat ? "flex grow" : "hidden"}
      `}
    >
      <ChatRoomHeader name={data?.chatName} setShowMainChat={setShowMainChat} />
      <div className=" w-full grow    pr-2 pt-3 relative">
        {messageData?.map((message: MessageDataType, index: number) => {
          return (
            <>
              {message.sender._id !== id ? (
                <OtherMessage
                  message={message}
                  firstLetter={
                    messageData[index - 1]?.sender._id === id || index === 0
                  }
                />
              ) : (
                <UserMessage
                  message={message}
                  firstLetter={
                    messageData[index - 1]?.sender._id === id || index === 0
                  }
                />
              )}
            </>
          );
        })}
      </div>
      <ChatInput
        setMessageData={setMessageData}
        messageData={messageData}
        chatId={data?._id}
        senderId={id}
        socket={socket}
      />
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatRoomContainer;
