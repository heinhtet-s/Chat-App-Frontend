import React from "react";
import Image from "next/image";
import DefaultImage from "../assets/images/person1.png";
import { HiUserGroup } from "react-icons/hi";
import { Logout } from "../../helper/Logout";
import { BiExit } from "react-icons/bi";
const ChatListNav = () => {
  return (
    <div className="flex justify-between items-center ">
      <h3 className="text-2xl  font-bold">CHAT</h3>
      <div>
        <button className="p-3 rounded-full dark:bg-gray-700">
          <HiUserGroup className="text-xl" />
        </button>
        <button
          onClick={() => {
            Logout();
          }}
          className="p-3 rounded-full ml-3 dark:bg-gray-700"
        >
          <BiExit className="text-xl" />
        </button>
      </div>
    </div>
  );
};
export default ChatListNav;
