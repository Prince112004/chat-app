import React from "react";

import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, theme } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[880px] sm:h-[600px] ">
      <BorderAnimatedContainer>
        {/* For desktop view */}
        <div className="hidden sm:flex size-full">
          {/* LEFT SIDE */}
          <div
            className={`w-80 ${
              theme === "dark" ? "dark_theme" : "light_theme"
            } backdrop-blur-sm flex flex-col transition-all duration-300`}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            {/* This is the main scrolling container for the lists */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE */}
          {/* I also added theme logic here, as it was hardcoded to dark */}
          <div
            className={`flex-1 flex flex-col ${
              theme === "dark" ? "bg-slate-900/50" : "bg-gray-200/50"
            } backdrop-blur-sm`}
          >
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>

        {/* For Mobile View */}
        <div
          className={`flex sm:hidden size-full ${
            theme === "dark" ? "dark_theme" : "light_theme"
          }`}
        >
          {/* --- THIS IS THE NEW LOGIC ---
            We check if a user is selected.
            If YES: show the ChatContainer.
            If NO: show the lists.
          */}
          {selectedUser ? (
            // VIEW 1: SHOW CHAT CONTAINER
            <div className="flex flex-col w-full h-full">
              <ChatContainer />
            </div>
          ) : (
            // VIEW 2: SHOW LISTS (Chats or Contacts)
            // This layout is fixed to be a proper flex column
            <div className="w-full flex flex-col h-full">
              <ProfileHeader />

              {/* Main scrolling area for lists */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>

              {/* Tab switch at the bottom */}
              <div className="w-full">
                <ActiveTabSwitch />
              </div>
            </div>
          )}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;