import React from 'react'
import { Link } from 'react-router-dom'
import "./SignIn.css"

function SignIn() {
  return (
    <div className='h-screen flex flex-col items-center pt-36'>
      <div className='mb-8 px-12'>
        <h1 className='text-3xl font-black mb-3'>Welcome Back 🤗</h1>
        <p className='text-xl leading-5 text-mainTextColor'><p className='mb-1'>Let's Sign you In,</p>You have been really missed.</p>
      </div>
      <form className='Auth-form mt-8 flex flex-col justify-end items-end'>
          <div className=' w-fit flex flex-col'>
            <label htmlFor="username-email"><input id="username-email" className='h-16 normal:h-20 mb-2 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 pr-3 outline-none' placeholder='@jhonDoe - jhonDoe@gmail.com' type="text" /></label>
            <label htmlFor="password"><input id="password" className='h-16 normal:h-20 mb-2 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' type="password" placeholder='Password - eg. ljfw3094wojf' /></label>
        </div>
        <Link to="/Reset_Password" className='mt-2 text-secondaryTextColor mr-3 cursor-pointer'>Forgot Password?</Link>
        <div className='flex flex-col  items-center justify-center mt-6 w-full'>
          <button type='submit' className='h-16 normal:h-20 text-mainBackgroundDarkColor w-52 normal:w-56 mb-4 bg-mainButtonColor rounded-xl border-none font-bold shadow-lg cursor-pointer transition duration-300 text-lg'>Sign In</button>
          <p className='text-secondaryTextColor text-tiny'>Don't have an account? <Link className='text-mainAccentColor underline cursor-pointer' to="/SignUp">SignUp</Link></p>
        </div>
      </form>
    </div>
  )
}

export default SignIn