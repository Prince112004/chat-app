import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

const ChatsList = () => {
  const { getMyChatPartner, chats, isUserLoading, setSelectedUser } = useChatStore();

  useEffect(() => {
    getMyChatPartner();
  }, [getMyChatPartner]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (!Array.isArray(chats) || chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2 overflow-y-auto max-h-[70vh] p-2">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/40 
                     rounded-xl p-3 hover:bg-cyan-500/10 hover:border-cyan-400/40 
                     transition-all cursor-pointer"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="avatar avatar-online">
            <div className="size-12 rounded-full overflow-hidden">
              <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
            </div>
          </div>
          <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
