import React from 'react'
import {LoaderIcon} from "lucide-react"
const PageLoader = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-transparent'>
      <LoaderIcon  className='size-10 animate-spin bg-transparent'/>
    </div>
  )
}

export default PageLoader