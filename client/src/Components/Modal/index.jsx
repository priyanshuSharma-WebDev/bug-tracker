import React from 'react'
import { Link } from 'react-router-dom'

function Modal() {
  return (
    <div className='absolute'>
      <form className='Auth-form mt-6' >
        <div className='w-fit flex'>
            <div className=' w-fit flex flex-col'>
                <label htmlFor="title"><span className='mb-1 ml-3 opacity-30 block'>Name</span><input  name="fullName" id="name" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' placeholder='Name - eg. Jhon Doe' type="text" /></label>
                <label htmlFor="description"><span className='mb-1 ml-3 opacity-30 block'>Username</span><input  name="username" id="username" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' placeholder='Username - eg. @jhonDoe' type="text" /></label>
                <label htmlFor="assignedTo"><span className='mb-1 ml-3 opacity-30 block'>Email</span><input  name="email" id="email" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' type="email" placeholder='Email - eg.jhonDoe@gmail.com' /></label>
                <label htmlFor="submittedBy"><span className='mb-1 ml-3 opacity-30 block'>Password</span><input  name="password" id="password" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' type="password" placeholder='Password - eg. ljfw3094wojf' /></label>
            </div>
            <div>
                <label htmlFor="title"><span className='mb-1 ml-3 opacity-30 block'>Name</span><input  name="fullName" id="name" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' placeholder='Name - eg. Jhon Doe' type="" /></label>
            </div>
        </div>
        <div className='flex flex-col  items-center justify-center mt-6'>
          <button type='submit' className='h-16 normal:h-20 text-mainBackgroundDarkColor w-52 normal:w-56 mb-4 bg-mainButtonColor rounded-xl border-none font-bold shadow-lg cursor-pointer transition duration-300 text-lg'>Sign Up</button>
          <p className='text-secondaryTextColor text-tiny'>Already have an account? <Link className='text-mainAccentColor underline cursor-pointer' to="/SignIn">SignIn</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Modal