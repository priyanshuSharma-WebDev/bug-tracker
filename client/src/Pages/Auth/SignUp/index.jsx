import React from 'react'
import "./Signup.css"

function SignUp() {
  return (
    <div className='h-screen flex flex-col items-center pt-36'>
      <div className='mb-8 px-12'>
        <h1 className='text-3xl font-black mb-3'>Welcome 🤗</h1>
        <p className='text-xl leading-5 text-mainTextColor'><p>Let's Sign you Up,</p>We will love to working with you.</p>
      </div>
      <form className='SignUp-form'>
        <div className=' w-fit flex flex-col'>
          <label  htmlFor="name"><input id="name" className='h-16 mb-2 w-60 rounded-xl bg-secondaryBackgroundDarkColor border-2 border-solid border-borderColor text-lg pl-6 outline-none' placeholder='Name - eg. Jhon Doe' type="text" /></label>
          <label htmlFor="email"><input id="email" className='h-16 mb-2 w-60 rounded-xl bg-secondaryBackgroundDarkColor border-2 border-solid border-borderColor text-lg pl-6 outline-none' type="email" placeholder='Email - eg.jhonDoe@gmail.com' /></label>
          <label htmlFor="password"><input id="password" className='h-16 mb-2 w-60 rounded-xl bg-secondaryBackgroundDarkColor border-2 border-solid border-borderColor text-lg pl-6 outline-none' type="password" placeholder='Password - eg. ljfw3094wojf' /></label>
          <label htmlFor="password"><input id="password" className='h-16 mb-2 w-60 rounded-xl bg-secondaryBackgroundDarkColor border-2 border-solid border-borderColor text-lg pl-6 outline-none' type="password"  placeholder='Password - eg. ljfw3094wojf'/></label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUp