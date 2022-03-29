import React from 'react'
import { IconContext } from 'react-icons'
import { FiMoreHorizontal } from "react-icons/fi"
import { FaBomb, FaCaretUp, FaGlobeAmericas, FaLock, FaFilter, FaUserPlus, FaUser } from "react-icons/fa"
import "./UserProject.css"
import Thread from '../../Components/ThreadCard'

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
      <div className='flex flex-col  items-center justify-between  mt-2'>
        <input className='block w-full py-3 rounded-lg pl-6 text-black text-lg mb-4 bg-mainBackgroundDarkColor border-2 border-solid border-secondaryTextColor' type="text" placeholder='Search' />
        <div className='w-full flex items-center justify-between'>
          <button className='h-12 w-24 rounded-lg text-mainTextColor bg-mainAccentColor shadow-md cursor-pointer '>Create</button>
          <div className='flex items-center justify-between'>
            <button className='mr-2 underline w-10 h-10 flex items-center justify-center transition-all hover:bg-mainTextColor/10 rounded-full'>
              <IconContext.Provider value={{ className: "text-secondaryTextColor w-5 h-5" }}>
                <FaUserPlus />
              </IconContext.Provider>
            </button>
            <button className=' underline w-10 h-10 flex items-center justify-center transition-all hover:bg-mainTextColor/10 rounded-full'>
              <IconContext.Provider value={{ className: "text-secondaryTextColor w-4 h-4" }}>
                <FaFilter />
              </IconContext.Provider>
            </button>
          </div>
        </div>
        <div>
          {/* filters  */}
        </div>
        <div className='rounded-2xl w-full h-26rem sm:h-38rem min-h-20rem mx-auto max-w-70rem border-2 border-solid border-borderColor mt-8 py-2 bg-secondaryBackgroundDarkColor' >
          <div className='scrollable overflow-auto w-full h-full bg-secondaryBackgroundDarkColor  rounded-xl z-0'>
            <Thread />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProject