import React from "react";
import Image from "next/image";
import DefaultImage from "../../assets/images/person1.png";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
type ChatRoomHeaderProps = {
  name?: string;
  setShowMainChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatRoomHeader = ({ name, setShowMainChat }: ChatRoomHeaderProps) => {
  return (
    <div className="flex justify-between   sticky top-0 left-0 dark:bg-gray-900 z-20 items-center pt-5 pl-5 pb-3  border-b  border-gray-700">
      <div className="flex items-center  ">
        <button
          onClick={() => {
            setShowMainChat(false);
          }}
          className=" flex sm:hidden justify-center  mr-2 items-center w-9 h-9 rounded-full dark:bg-gray-700"
        >
          <FiArrowLeft className="text-lg" />
        </button>

        <div className="w-10 h-10 rounded-full mr-2">
          <Image
            src={DefaultImage}
            width="100%"
            height="100%"
            className="object-cover"
            alt=""
          />
        </div>
        <div>
          <h3 className="text-md font-bold">{name}</h3>
          <p className="text-xs tracking-wide">Active now</p>
        </div>
      </div>
      <div className="flex items-center ">
        <BsFillCameraVideoFill className="text-xl cursor-pointer mx-3" />
        <BsFillInfoCircleFill className="text-xl mx-3  cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatRoomHeader;
