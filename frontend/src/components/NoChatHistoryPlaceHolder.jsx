import React from "react";
import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore"; // 1. Import the store

const NoChatHistoryPlaceHolder = ({ name }) => {
  const { theme } = useChatStore(); // 2. Get the theme

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
          // 3. Theme for icon background
          theme === "dark"
            ? "bg-linear-to-r from-cyan-500/20 to-cyan-400/10"
            : "bg-cyan-100"
        }`}
      >
        <MessageCircleIcon
          className={`size-8 ${
            // 4. Theme for icon color
            theme === "dark" ? "text-cyan-400" : "text-cyan-600"
          }`}
        />
      </div>
      <h3
        className={`text-lg font-medium mb-3 ${
          // 5. Theme for header text
          theme === "dark" ? "text-slate-200" : "text-slate-800"
        }`}
      >
        Start your conversation with {name}
      </h3>
      <div className="flex flex-col space-y-3 max-w-md mb-5">
        <p
          className={`text-sm ${
            // 6. Theme for paragraph text
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          }`}
        >
          This is the beginning of your conversation. Send a message to start
          chatting!
        </p>
        <div
          className={`h-px w-32 bg-linear-to-r from-transparent to-transparent mx-auto ${
            // 7. Theme for divider
            theme === "dark" ? "via-cyan-500/30" : "via-gray-300"
          }`}
        ></div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {/* 8. Theme for all three buttons */}
        <button
          className={`px-4 py-2 text-xs font-medium rounded-full transition-colors ${
            theme === "dark"
              ? "text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20"
              : "text-cyan-700 bg-cyan-100 hover:bg-cyan-200"
          }`}
        >
          👋 Say Hello
        </button>
        <button
          className={`px-4 py-2 text-xs font-medium rounded-full transition-colors ${
            theme === "dark"
              ? "text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20"
              : "text-cyan-700 bg-cyan-100 hover:bg-cyan-200"
          }`}
        >
          🤝 How are you?
        </button>
        <button
          className={`px-4 py-2 text-xs font-medium rounded-full transition-colors ${
            theme === "dark"
              ? "text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20"
              : "text-cyan-700 bg-cyan-100 hover:bg-cyan-200"
          }`}
        >
          📅 Meet up soon?
        </button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceHolder;