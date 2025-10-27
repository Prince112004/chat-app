import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {
  const {logout}= useAuthStore();

  return (
    <div className='z-10 text-lg flex flex-col text-white gap-5'>
      ChatPage
      <button onClick={logout}>Logout</button>

    </div>
  )
}

export default ChatPage