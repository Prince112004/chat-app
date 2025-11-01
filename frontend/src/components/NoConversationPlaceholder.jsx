import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore"; // 1. Import the store

const NoConversationPlaceholder = () => {
  const { theme } = useChatStore(); // 2. Get the theme

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div
        className={`size-20 rounded-full flex items-center justify-center mb-6 ${
          // 3. Theme for icon background
          theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"
        }`}
      >
        <MessageCircleIcon
          className={`size-10 ${
            // 4. Theme for icon color
            theme === "dark" ? "text-cyan-400" : "text-cyan-600"
          }`}
        />
      </div>
      <h3
        className={`text-xl font-semibold mb-2 ${
          // 5. Theme for header text
          theme === "dark" ? "text-slate-200" : "text-slate-800"
        }`}
      >
        Select a conversation
      </h3>
      <p
        className={`max-w-md ${
          // 6. Theme for paragraph text
          theme === "dark" ? "text-slate-400" : "text-gray-600"
        }`}
      >
        Choose a contact from the sidebar to start chatting or continue a
        previous conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;