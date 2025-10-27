import {create} from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";

export const useChatStore=create((set,get)=>({
      allContacts:[],
      chars:[],
      messages:[],
      activeTab:"chats",
      selectedUser:false,
      isUserLoading:false,
      isMessageLoading:false,
      isSoundEnabled:localStorage.getItem("isSoundEnabled")===true,

      toggleSound:()=>{
            localStorage.setItem("isSoundEnabled", !get().isSoundEnabled());
            set({isSoundEnabled: !get().isSoundEnabled()});
      },

      setActiveTabs:(tab)=>{
            set({activeTab:tab});
      },
      setSelectedUser:(selectedUser)=>{
            set({selectedUser});
      },

      getAllContacts: async()=>{
            set({isUserLoading:true});
            try {
                  const res = await axiosInstance.get("/messages/contact");
                  set({allContacts:res.data});
            } catch (error) {
                  toast.error(error.response.data.message);
            }
      },
      
      
      getMyPartnerChat: async()=>{
            set({isUserLoading:true});
            try {
                  const res = await axiosInstance.get("/messages/chat");
                  set({allContacts:res.data});
            } catch (error) {
                  toast.error(error.response.data.message);
            }
      },
}))