import React from 'react'
import { IconContext } from 'react-icons'
import { FiMoreHorizontal } from "react-icons/fi"
import { FaBomb, FaCaretUp, FaGlobeAmericas, FaLock } from "react-icons/fa"
import "./Thread.css"

function Thread() {
  return (
    <div className='mt-20 w-5/6 mx-auto sm:mt-32 max-w-70rem'>
      <div className='flex justify-between items-center'>
        <h1 className='font-primaryHeading font-black text-lg  underline'>Issue Name -</h1>
        <button className='rounded-full p-2 hover:bg-mainButtonColor/10 transition-all'>
          <IconContext.Provider value={{ className: "text-secondaryTextColor w-6 h-6" }}>
            <FiMoreHorizontal />
          </IconContext.Provider>
        </button>
      </div>
      <div className='mt-8  mx-auto sm:mt-12 w-full'>
        <p className='ml-4'>ID: <span className='text-secondaryTextColor font-RegularFont font-normal'>0x9k3jrwo3</span></p>
        <div className='w-full bg-secondaryBackgroundDarkColor rounded-2xl border-2 border-solid border-borderColor mt-2 p-8 md:py-8 md:px-16 semiNormal:grid semiNormal:grid-cols-3 semiNormal:gap-6 sm:grid-cols-4 sm:gap-6 max-w-70rem'>
          <div className='mt-2 mb-6 sm:mb-0 sm:mt-0 sm:flex sm:flex-col sm:items-start sm:justify-center semiNormal:col-span-3 sm:col-span-4'>
            <img className='w-full h-full  md:block md:mx-auto md:h-26rem object-cover rounded-lg' src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1492&q=80" alt="thread image source" />
          </div>

          <div className='mt-2 semiNormal:mt-0 semiNormal:flex semiNormal:flex-col semiNormal:items-start semiNormal:justify-center'>
            <h3 className='text-secondaryTextColor font-RegularFont font-normal mb-2 text-tiny'>Title</h3>
            <p>Issue Name</p>
          </div>
          <div className='mt-6 semiNormal:mt-0 semiNormal:flex semiNormal:flex-col semiNormal:items-start semiNormal:justify-center'>
            <h3 className='text-secondaryTextColor font-RegularFont font-normal mb-2 text-tiny'>Severity</h3>
            <p className='flex items-center'>
              <IconContext.Provider value={{ className: "text-danger w-4 h-4 mr-1 -mt-1" }}>
                <FaBomb />
              </IconContext.Provider>
              Crash
            </p>
          </div>
          <div className='mt-6 semiNormal:mt-0 semiNormal:flex semiNormal:flex-col semiNormal:items-start semiNormal:justify-center'>
            <h3 className='text-secondaryTextColor font-RegularFont font-normal mb-2 text-tiny'>Reporter</h3>
            <p className='text-mainAccentColor'>@KettyPerry</p>
          </div>
          <div className='mt-6 semiNormal:mt-0 semiNormal:flex semiNormal:flex-col semiNormal:items-start semiNormal:justify-center'>
            <h3 className='text-secondaryTextColor font-RegularFont font-normal mb-2 text-tiny'>Assigned to</h3>
            <p className='text-mainAccentColor'>@NezukoChan</p>
          </div>
          <div className='mt-6 semiNormal:mt-0 semiNormal:flex semiNormal:flex-col semiNormal:items-start semiNormal:justify-center'>
            <h3 className='text-secondaryTextColor font-RegularFont font-normal mb-2 text-tiny'>View Status</h3>
            <p className='flex items-center'>
              <IconContext.Provider value={{ className: "text-mainAccentColor w-4 h-4 mr-1 -mt-1" }}>
                <FaLock />
              </IconContext.Provider>
              Private
            </p>
          </div>
          <div className='mt-6 semiNormal:mt-0 semiNormal:flex semiNormal:flex-col semiNormal:items-start semiNormal:justify-center'>
            <h3 className='text-secondaryTextColor font-RegularFont font-normal mb-2 text-tiny'>Priority</h3>
            <p className='flex items-center'>
              <IconContext.Provider value={{ className: "text-danger w-4 h-4 mr-1" }}>
                <FaCaretUp />
              </IconContext.Provider>
              High
            </p>
          </div>
          <div className='mt-6 semiNormal:mt-0 semiNormal:flex semiNormal:flex-col semiNormal:items-start semiNormal:justify-center'>
            <h3 className='text-secondaryTextColor font-RegularFont font-normal mb-2 text-tiny'>Project</h3>
            <p>Project Name</p>
          </div>
          <div className='mt-6 sm:mt-0 sm:flex sm:flex-col sm:items-start sm:justify-center'>
            <h3 className='text-secondaryTextColor font-RegularFont font-normal mb-2 text-tiny'>Status</h3>
            <p className='text-success font-primaryHeading font-black'>Resolved</p>
          </div>
          <div className='mt-6 semiNormal:mt-0 semiNormal:flex semiNormal:flex-col semiNormal:items-start semiNormal:justify-center semiNormal:col-span-3 sm:col-span-4'>
            <h3 className='text-secondaryTextColor font-RegularFont font-normal mb-2 text-tiny'>Description</h3>
            <p className='md:w-11/12 md:tracking-tight md:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate magnam delectus non, minima, temporibus blanditiis, corrupti vero magni quisquam eligendi nobis sapiente quibusdam sed vitae earum sint possimus nemo adipisci.</p>
          </div>
        </div>
      </div>
      <button></button>
    </div>
  )
}

export default Thread