import React from 'react'
import { useState, useRef } from 'react';
import {LogOutIcon, VolumeOffIcon,Volume2Icon} from "lucide-react"
import {useAuthStore} from "../store/useAuthStore";
import {useChatStore} from "../store/useChatStore";

const ProfileHeader = () => {
  const {logout,authUser,updateProfile}= useAuthStore();
  const {isSoundEnabled,toggleSound} =useChatStore();
  const [selectedImg,setSelectedImg]=useState(null);
  const fileInputRef=useRef(null);

  const handleImageUpload=(e)=>{

  }

  return (
    <div className='p-6 border-b border-slate-700/50'>
      <div className=' flex flex-col items-center justify-between'>
       <div  className='flex items-center gap-3'>
          {/* Avatar */}
            <div className='avatar avatar-online '>

              <button className='size-14 rounded-full overflow-hidden relative group' onClick={()=>fileInputRef.current.click()}>
                <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="User image"  className='size-full object-cover'/>

                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer duration-400">
                  <span className="text-white text-xs">Change</span>

                </div>
              </button>

              <input type="file"
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageUpload}
              className='hidden'
              />
            </div>
       </div>
      </div>
    </div>
  )
}

export default ProfileHeader