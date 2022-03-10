import React from 'react'
import { IconContext } from 'react-icons'
import {FiUser} from "react-icons/fi"
import ProfileImg from "../../../Assets/Images/profile.jpg"

function Drawer() {
  return (
    <div className='absolute w-60 h-auto pb-8 right-0 top-7 rounded-lg border-2 border-solid border-borderColor bg-secondaryBackgroundDarkColor'>
      <div className='flex flex-col items-center justify-center w-full mt-8 '>
        <img className='block w-20 h-20 object-cover rounded-full outline-4 outline outline-mainAccentColor outline-offset-4' src={ProfileImg} alt="profile picture" />
        <div className='mt-6'>
          <h3>@KettyPerry</h3>
          <p className='text-tiny text-center text-secondaryTextColor mt-2'>🎂 10 Mar 2022</p>
        </div>
      </div>
      <hr className='border-t-0 w-5/6 mx-auto mt-4 mb-2 border-b-2 border-solid border-b-borderColor' />
      <ul>
        <li className='w-full h-12 flex items-center justify-center cursor-pointer text-lg hover:bg-mainButtonColor/10'> 
        <IconContext.Provider value={{className: "mr-2 text-secondaryTextColor"}}>
          <FiUser />
        </IconContext.Provider>
        Profile
        </li>
      </ul>
      <button className='w-40 h-14 rounded-lg bg-danger text-mainTextColor shadow-lg shadow-mainBackgroundDarkColor text-base block mx-auto font-bold mt-4'>SignOut</button>
    </div>
  )
}

export default Drawer