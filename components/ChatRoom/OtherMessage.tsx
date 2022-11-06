import React from "react";
import Image from "next/image";
import DefaultImage from "../../assets/images/person1.png";
import { MessageDataType } from "./ChatRoomContainer";
import { format } from "timeago.js";

type OtherMessageProps = { message: MessageDataType; firstLetter: boolean };
const OtherMessage = ({ message, firstLetter }: OtherMessageProps) => {
  return (
    <div className="flex w-full ">
      <div className="w-full flex">
        <div className="w-7 h-7 rounded-full  " style={{ flex: "0 0 30px" }}>
          {firstLetter && (
            <Image
              src={DefaultImage}
              width="100%"
              height="100%"
              className="object-cover"
              alt=""
            />
          )}
        </div>
        <div className="flex w-1/2 flex-col mb-2">
          <div className="w-fit max-w-full break-words dark:bg-gray-800  p-1.5 text-sm ml-2 rounded-tr-lg rounded-bl-lg rounded-br-lg ">
            {message.content}
            <p
              className=" text-gray-500  text-end"
              style={{ fontSize: "11px" }}
            >
              {format(message.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherMessage;
