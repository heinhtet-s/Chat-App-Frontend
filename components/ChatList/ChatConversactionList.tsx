import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../../redux/slices/ChatSlice";
import useFetchQuery from "../../services/GetRequest";
import { FetchChatItemType } from "./ChatListContainer";
import ChatListItem from "./ChatListItem";
type FetchChatType = {
  data: FetchChatItemType[];
};
type ChatListContainerProps = {
  setShowMainChat: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChatConversactionList = ({ setShowMainChat }: ChatListContainerProps) => {
  const {
    isLoading,
    isFetching,
    data: chatListData,
    isError,
    isSuccess,
    error,
  } = useFetchQuery<FetchChatType>("api/chat", "test");
  const dispatch = useDispatch();
  const [activeChat, setActiveChat] = React.useState<number | null>(null);
  const storeChatHandler = (id: number): void => {
    setActiveChat(id);
    let userId = localStorage.getItem("id");
    const chatName = chatListData?.data[id]?.isGroupChat
      ? chatListData?.data[id]?.chatName
      : chatListData?.data[id]?.users?.filter((user) => user._id !== userId)[0]
          ?.name;
    dispatch(add({ ...chatListData?.data[id], chatName }));
    setShowMainChat(true);
  };
  return (
    <div className="h-full overflow-y-scroll pr-3 mt-4 ">
      {chatListData?.data.map((el: FetchChatItemType, index: number) => (
        <ChatListItem
          key={index}
          index={index}
          activeChat={activeChat}
          data={el}
          storeChatHandler={storeChatHandler}
        />
      ))}
    </div>
  );
};

export default ChatConversactionList;
