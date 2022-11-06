import React from "react";
import { format } from "timeago.js";
import { MessageDataType } from "./ChatRoomContainer";

type UserMessageProps = { message: MessageDataType; firstLetter: boolean };
const UserMessage = ({ message, firstLetter }: UserMessageProps) => {
  return (
    <div className="flex w-full justify-end pr-3  ">
      <div className=" w-1/2 flex flex-col items-end">
        <div
          className={` w-fit max-w-full text-end break-words bg-green-400 text-black mb-2 p-1.5 pb-0 text-sm ml-2  rounded-tl-lg rounded-bl-lg rounded-br-lg ${
            firstLetter && "rounded-tr-lg"
          } `}
        >
          {message?.content}
          <p className=" text-slate-500 text-end" style={{ fontSize: "11px" }}>
            {format(message.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
