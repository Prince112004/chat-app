import React from "react";
import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTabs, theme } = useChatStore();

  return (
    <div className="relative w-full max-w-xs mx-auto mt-3 ">
      {/* Tabs Container */}
      {/* backdrop-blur-sm will work for both themes by blurring what's behind it */}
      <div className="relative flex bg-transparent p-2 rounded-xl backdrop-blur-sm overflow-hidden">
        {/* Animated Background Highlight */}
        <div
          className={`absolute top-2 bottom-2 w-[calc(50%-0.5rem)] rounded-lg transition-all duration-500 ease-in-out ${
            activeTab === "chats" ? "left-2" : "left-[calc(50%+0.25rem)]"
          } ${
            // --- Theme Logic Added ---
            theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-500"
          }`}
        ></div>

        {/* Tabs */}
        <button
          onClick={() => setActiveTabs("chats")}
          className={`flex-1 relative z-10 py-2 font-medium text-sm rounded-lg transition-all duration-300 cursor-pointer ${
            activeTab === "chats"
              ? // Active tab colors
                theme === "dark"
                ? "text-cyan-300 scale-105"
                : "text-white scale-105" // Light mode active
              : // Inactive tab colors
                theme === "dark"
                ? "text-slate-400 hover:text-slate-200"
                : "text-gray-600 hover:text-black" // Light mode inactive
          }`}
        >
          Chats
        </button>

        <button
          onClick={() => setActiveTabs("contacts")}
          className={`flex-1 relative z-10 py-2 font-medium text-sm rounded-lg transition-all duration-300 cursor-pointer ${
            activeTab === "contacts"
              ? // Active tab colors
                theme === "dark"
                ? "text-cyan-300 scale-105"
                : "text-white scale-105" // Light mode active
              : // Inactive tab colors
                theme === "dark"
                ? "text-slate-400 hover:text-slate-200"
                : "text-gray-600 hover:text-black" // Light mode inactive
          }`}
        >
          Contacts
        </button>
      </div>
    </div>
  );
};

export default ActiveTabSwitch;