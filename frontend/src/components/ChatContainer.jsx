import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  console.log(messages);
  const { authUser } = useAuthStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if (isMessagesLoading)
    return (
      <div>
        <ChatHeader />
        messages...
        <ChatInput />
      </div>
    );

  const timeConv = (date)=>{
    return new Date(date).toLocaleTimeString("en-IN", {
      hour : "2-digit",
      minute : "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="" style={{width: '50vw'}}>
      <ChatHeader />

      <div className="flex-1 flex-col overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          return (
            <div
              key={msg._id}
              className={`chat ${
                msg.senderId === authUser._id ? "chat-end" : "chat-start"
              } flex`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      msg.senderId === authUser._id
                        ? authUser.pfp || "/avatar.png"
                        : selectedUser.pfp || "/avatar.png"
                    }
                  />
                </div>
              </div>
              <div className="flex-col">
                <div className="chat-bubble flex-col">
                  {msg.image && (
                    <img
                      src={msg.image}
                      className="sm:max-w-[200px] rounded-md mb-2"
                      alt="some image"
                    />
                  )}

                  {msg.text && <p>{msg.text}</p>}
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {timeConv(msg.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
