import React from 'react'
import {FaBomb, FaCircle} from "react-icons/fa"
import { IconContext } from 'react-icons';

function Thread() {
  return (
    <div className='w-full h-12 sm:h-14 border-b-2 border-solid border-b-borderColor flex items-center justify-between pl-3 cursor-pointer transition-all hover:bg-mainButtonColor/10'>
        <h3 className='text-base text-mainTextColor cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis max-w-charWtiny normal:max-w-charWnormal sm:overflow-visible sm:text-left sm:max-w-none sm:text-lg'>Some thread name</h3>
        <span className='text-super-tiny text-secondaryTextColor cursor-pointer sm:text-tiny'>10 Mar 2022</span>
        <div className='flex h-full items-center justify-around'>
            <span>
            <IconContext.Provider value={{ className: "text-danger mr-3 w-4 h-4 sm:w-5 sm:h-5" }}>
                <FaBomb />
            </IconContext.Provider>
        </span> 
            <span>
            <IconContext.Provider value={{ className: "text-success mr-3 w-4 h-4 sm:w-5 sm:h-5" }}>
                <FaCircle />
            </IconContext.Provider>
        </span> 
        </div>
    </div>
  )
}

export default Thread