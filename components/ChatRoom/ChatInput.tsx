import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import usePostQuery from "../../services/PostRequest";
import { MessageDataType } from "./ChatRoomContainer";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { add } from "../../redux/slices/ChatSlice";

type ChatListContainerProps = {
  chatId?: string;
  senderId: string | null;
  messageData: MessageDataType[];
  setMessageData: React.Dispatch<React.SetStateAction<MessageDataType[]>>;
  socket: any;
};

const ChatInput = ({
  chatId,
  senderId,
  messageData,
  socket,
  setMessageData,
}: ChatListContainerProps) => {
  const [message, setMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const storeMessageHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setMessage(e.target.value);
    setIsTyping(true);
  };
  useEffect(() => {
    setMessage("");
  }, [chatId]);

  const { isLoading: depositLoading, mutate: sendMutate } = usePostQuery(
    `api/message`,
    {
      onSuccess: (data: any) => {
        setMessageData([...messageData, data?.data]);
        console.log(data);
        socket.emit("new message", data?.data);
        setMessage("");
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
  const dispatch = useDispatch();
  const { isLoading: connectChatLoading, mutate: connectChatMutate } =
    usePostQuery(`api/chat/connectChat`, {
      onSuccess: (data: any) => {
        console.log("fullChat", data);
        const chatName = data.data.FullChat?.users?.filter(
          (user: any) => user._id !== senderId
        )[0]?.name;
        console.log("chatName", chatName);
        dispatch(
          add({
            ...data.data.FullChat,
            chatName,
          })
        );
        sendMutate([
          {
            sender: senderId,
            content: message,
            chatId: data.data?.FullChat?._id,
          },
        ]);
      },
      onError: (error: any) => {
        console.log(error);
      },
    });
  const SendMessageHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      if (messageData.length !== 0) {
        sendMutate([
          {
            sender: senderId,
            content: message,
            chatId: chatId,
          },
        ]);
      } else {
        connectChatMutate([
          {
            userId: chatId,
          },
        ]);
      }
    }
  };
  const SendMessgeClickHandler = () => {
    sendMutate([
      {
        sender: senderId,
        content: message,
        chatId: chatId,
      },
    ]);
  };
  return (
    <div className="sticky bottom-0 z-20  w-full left-0 pl-2 flex dark:bg-gray-900 pb-3 ">
      <button className=" flex justify-center items-center w-9 h-9 rounded-full dark:bg-gray-700">
        <BsFillPlusCircleFill className="text-lg" />
      </button>
      <input
        type="text"
        placeholder="Search..."
        onChange={storeMessageHandler}
        value={message}
        onKeyDown={SendMessageHandler}
        className=" grow ml-2 p-2 mr-2 pl-5 text-sm  border-non rounded-2xl outline-none dark:bg-gray-700 "
      />
      <button
        onClick={SendMessgeClickHandler}
        className=" flex justify-center  mr-2 items-center w-9 h-9 rounded-full dark:bg-gray-700"
      >
        <BsArrowRightCircleFill className="text-lg   " />
      </button>
    </div>
  );
};

export default ChatInput;
