//centralized place for all the states 
import { create } from "zustand";

export const useAuthStore=create((set)=>({
      authUser:{name:"Prince",_id:123,age:233},
      isLoading:false,

      login:()=>{
            console.log("Logged in !!!");
            set({isLoading:false});
      }
      
      
}))