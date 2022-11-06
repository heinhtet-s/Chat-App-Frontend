import React, { useEffect, useState } from "react";
import Image from "next/image";
import DefaultImage from "../../assets/images/person1.png";
import { FetchChatItemType } from "./ChatListContainer";
import { format } from "timeago.js";
type ChatListItemProps = {
  data: FetchChatItemType;
  storeChatHandler: (id: number) => void;
  activeChat: number | null;
  index: number;
};
const ChatListItem = ({
  data,
  storeChatHandler,
  activeChat,
  index,
}: ChatListItemProps) => {
  const [id, setId] = useState<string | null>("");
  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, []);
  console.log(index);
  return (
    <div
      onClick={() => storeChatHandler(index)}
      className={` flex justify-between  mb-3 cursor-pointer  p-3 rounded-2xl ${
        activeChat === index ? "dark:bg-gray-700" : "dark:bg-gray-800"
      }`}
    >
      <div className="flex items-center">
        <div className="w-14 h-14  rounded-full mr-2">
          <Image
            src={DefaultImage}
            width="100%"
            height="100%"
            className="object-cover"
            alt=""
          />
        </div>
        <div>
          <h3 className="text-md font-bold">
            {data?.isGroupChat
              ? data?.chatName
              : data?.users?.filter((user) => user._id !== id)[0]?.name}
          </h3>
          <p className="text-xs ">
            <span className="text-slate-400">
              {data?.latestMessage && data?.latestMessage?.sender?.name + " : "}
            </span>
            {data?.latestMessage
              ? data?.latestMessage?.content.length > 20
                ? data?.latestMessage?.content.slice(0, 20) + "..."
                : data?.latestMessage?.content
              : ""}
          </p>
        </div>
      </div>
      <p className="text-xs w-20 text-right">
        {format(data?.updatedAt || new Date())}
      </p>
    </div>
  );
};
export default ChatListItem;
