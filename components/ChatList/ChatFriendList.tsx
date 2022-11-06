import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import DefaultImage from "../../assets/images/person1.png";
import { add } from "../../redux/slices/ChatSlice";
import useFetchQuery from "../../services/GetRequest";
import { FetchChatItemType } from "./ChatListContainer";
type UserDataType = {
  user: { _id: string; name: string; email: string; pic: string }[];
};
type ChatRoomContainerProps = {
  setShowMainChat: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChatFriendList = ({ setShowMainChat }: ChatRoomContainerProps) => {
  const {
    isLoading,
    isFetching,
    data: userData,
    isError,
    isSuccess,
    error,
  } = useFetchQuery<UserDataType>("api/user", "userdata");
  const dispatch = useDispatch();
  const [activeChat, setActiveChat] = React.useState<number | null>(null);
  const storeChatHandler = (id: number): void => {
    setActiveChat(id);
    let userId = localStorage.getItem("id");
    console.log("userId", userData?.user[id]);
    dispatch(
      add({
        ...userData?.user[id],
        chatName: userData?.user[id]?.name,
        friendMood: true,
      })
    );
    setShowMainChat(true);
  };
  return (
    <div className="h-full overflow-y-scroll pr-3 mt-4">
      {userData?.user.map((data, index) => (
        <div
          key={data._id}
          onClick={() => storeChatHandler(index)}
          className={` flex justify-between  mb-3 cursor-pointer  p-2 rounded-xl ${
            index === activeChat ? "dark:bg-gray-700" : "dark:bg-gray-800"
          }`}
        >
          <div className="flex items-center">
            <div className="w-8 h-8  rounded-full mr-2">
              <Image
                src={DefaultImage}
                width="100%"
                height="100%"
                className="object-cover"
                alt=""
              />
            </div>
            <div>
              <h3 className="text-sm font-bold"> {data.name}</h3>
              <p className="text-xs ">
                <span className="text-slate-400">active now</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatFriendList;
