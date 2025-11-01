import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

const ChatsList = () => {
  const { getMyChatPartner, chats, isUserLoading, setSelectedUser, theme } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartner();
  }, [getMyChatPartner]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`p-4 rounded-lg cursor-pointer transition-colors custom-scrollbar ${
            // --- Theme Logic Added ---
            theme === "dark"
              ? "bg-cyan-500/10 hover:bg-cyan-500/20"
              : "bg-gray-200 hover:bg-gray-300" // Light mode background
          }`}
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers.includes(chat._id) ? "avatar-online" : "avatar-offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h4
              className={`font-medium truncate ${
                // --- Theme Logic Added ---
                theme === "dark" ? "text-slate-200" : "text-gray-800" // Light mode text
              }`}
            >
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatsList;