import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const ContactList = () => {
  const {
    getAllContacts,
    allContacts,
    setSelectedUser,
    isUsersLoading,
    theme, // 1. Get theme from the store
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className={`p-4 rounded-lg cursor-pointer transition-colors text-sm custom-scrollbar ${
            // 2. Add theme logic for background
            theme === "dark"
              ? "bg-cyan-500/10 hover:bg-cyan-500/20"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers.includes(contact._id)
                  ? "avatar-online"
                  : "avatar-offline"
              }`}
            >
              <div className="size-8 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
              </div>
            </div>
            <h4
              className={`font-medium ${
                // 3. Add theme logic for text color
                theme === "dark" ? "text-slate-200" : "text-gray-800"
              }`}
            >
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;