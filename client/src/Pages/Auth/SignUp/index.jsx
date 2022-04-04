import React from 'react'
import { Link } from 'react-router-dom'
import "./Signup.css"

function SignUp() {
  return (
    <div className='h-screen flex flex-col items-center pt-28'>
      <div className='mb-8 px-12'>
        <h1 className='text-3xl font-black mb-3'>Welcome 🤗</h1>
        <p className='text-xl leading-5 text-mainTextColor'><p className='mb-1'>Let's Sign you Up,</p>We will love to working with you.</p>
      </div>
      <form className='Auth-form mt-6'>
        <div className=' w-fit flex flex-col'>
          <label htmlFor="name"><input id="name" className='h-16 normal:h-20 mb-2 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' placeholder='Name - eg. Jhon Doe' type="text" /></label>
          <label htmlFor="username"><input id="username" className='h-16 normal:h-20 mb-2 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' placeholder='Username - eg. @jhonDoe' type="text" /></label>
          <label htmlFor="email"><input id="email" className='h-16 normal:h-20 mb-2 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' type="email" placeholder='Email - eg.jhonDoe@gmail.com' /></label>
          <label htmlFor="password"><input id="password" className='h-16 normal:h-20 mb-2 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' type="password" placeholder='Password - eg. ljfw3094wojf' /></label>
          <label htmlFor="password"><input id="password" className='h-16 normal:h-20 mb-2 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' type="password" placeholder='Password - eg. ljfw3094wojf' /></label>
        </div>
        <div className='flex flex-col  items-center justify-center mt-6'>
          <button type='submit' className='h-16 normal:h-20 text-mainBackgroundDarkColor w-52 normal:w-56 mb-4 bg-mainButtonColor rounded-xl border-none font-bold shadow-lg cursor-pointer transition duration-300 text-lg'>Sign Up</button>
          <p className='text-secondaryTextColor text-tiny'>Already have an account? <Link className='text-mainAccentColor underline cursor-pointer' to="/SignIn">SignIn</Link></p>
        </div>
      </form>
    </div>
  )
}

export default SignUp