import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  console.log(messages);
  
  const { authUser } = useAuthStore();
  const MessageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, unsubscribeFromMessages, subscribeToMessages]);

  useEffect(() => {
    if (MessageEndRef.current && messages) {
      MessageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div>
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );

  const timeConv = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="flex flex-col h-full" style={{ width: '50vw' }}>
      <ChatHeader />

      <div className="flex-1 flex-col overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          return (
            <div
              key={msg._id}
              className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      msg.senderId === authUser._id
                        ? authUser.pfp || "/avatar.png"
                        : selectedUser.pfp || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {timeConv(msg.createdAt)}
                </time>
              </div>
              <div className="flex-col">
                <div className="chat-bubble flex-col">
                  {msg.images && (
                    <img
                      src={msg.images}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {msg.text && <p>{msg.text}</p>}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={MessageEndRef} />
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
