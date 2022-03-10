import React from 'react'
import ProfileImg from "../../Assets/Images/profile.jpg"
import Drawer from './Drawer/index'

function Profile() {
  return (
    <div className='relative'>
       <button className='h-5 outline-2 outline outline-mainAccentColor outline-offset-2  w-5 rounded-full overflow-hidden'>
            <img className='w-full h-full object-cover' src={ProfileImg} alt="Profile image" />
       </button> 
       <Drawer />
    </div>
  )
}

export default Profile