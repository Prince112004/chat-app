import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, theme } = useChatStore(); // 1. Get theme
  const { onlineUsers } = useAuthStore();
  
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div
      className={`flex justify-between items-center border-b max-h-[84px] px-6 py-4 ${ // py-4 added for consistent height
        // --- 2. Theme Logic for background and border ---
        theme === "dark"
          ? "bg-slate-800/50 border-slate-700/50"
          : "bg-gray-100 border-gray-300"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-full object-cover"
            />
          </div>
        </div>
        <div>
          {/* Changed <h> to <p> for correct HTML semantics */}
          <p
            className={`font-medium ${
              // --- 3. Theme Logic for username text ---
              theme === "dark" ? "text-slate-200" : "text-gray-800"
            }`}
          >
            {selectedUser.fullName}
          </p>
          <p
            className={`text-sm ${
              // --- 4. Theme Logic for online/offline text ---
              theme === "dark" ? "text-slate-400" : "text-gray-500"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <XIcon
          className={`w-5 h-5 transition-colors cursor-pointer ${
            // --- 5. Theme Logic for close icon ---
            theme === "dark"
              ? "text-slate-400 hover:text-slate-200"
              : "text-gray-500 hover:text-black"
          }`}
        />
      </button>
    </div>
  );
};

export default ChatHeader;