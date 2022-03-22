import React from 'react'
import { IconContext } from 'react-icons'
import { FiMoreHorizontal } from "react-icons/fi"
import { FaBomb, FaCaretUp, FaGlobeAmericas, FaLock } from "react-icons/fa"
import "./UserProject.css"

function UserProject() {
  return (
    <div className='mt-20 w-5/6 mx-auto sm:mt-32 max-w-70rem'>
      <div className='flex justify-between items-center'>
        <h1 className='font-primaryHeading font-black text-lg  underline'>Project Name -</h1>
        <button className='rounded-full p-2 hover:bg-mainButtonColor/10 transition-all'>
          <IconContext.Provider value={{ className: "text-secondaryTextColor w-6 h-6" }}>
            <FiMoreHorizontal />
          </IconContext.Provider>
        </button>
      </div>
      <div className='flex flex-col  items-center justify-between bg-danger'>
        <input className='block w-full' type="text" placeholder='Search' />
        <div className='w-full flex items-center justify-between'>
          <button>Create</button>
          <div>
            <button>Invite</button>
            <button>Filter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProject