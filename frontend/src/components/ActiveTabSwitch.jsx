import React from "react";
import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTabs } = useChatStore();

  return (
    <div className="relative w-full max-w-xs mx-auto mt-3">
      {/* Tabs Container */}
      <div className="relative flex bg-transparent p-2  rounded-xl backdrop-blur-sm overflow-hidden">
        {/* Animated Background Highlight */}
        <div
          className={`absolute top-2 bottom-2 w-[calc(50%-0.5rem)] rounded-lg bg-cyan-500/20 transition-all duration-500 ease-in-out ${
            activeTab === "chats" ? "left-2" : "left-[calc(50%+0.25rem)]"
          }`}
        ></div>

        {/* Tabs */}
        <button
          onClick={() => setActiveTabs("chats")}
          className={`flex-1 relative z-10 py-2 font-medium text-sm rounded-lg transition-all duration-300 cursor-pointer ${
            activeTab === "chats"
              ? "text-cyan-300 scale-105"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Chats
        </button>

        <button
          onClick={() => setActiveTabs("contacts")}
          className={`flex-1 relative z-10 py-2 font-medium text-sm rounded-lg transition-all duration-300 cursor-pointer ${
            activeTab === "contacts"
              ? "text-cyan-300 scale-105"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Contacts
        </button>
      </div>
    </div>
  );
};

export default ActiveTabSwitch;
