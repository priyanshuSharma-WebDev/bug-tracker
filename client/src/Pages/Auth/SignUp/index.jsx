import React from 'react'
import "./Signup.css"

function SignUp() {
  return (
    <div className='h-screen flex flex-col items-center pt-36'>
      <div className='mb-8 px-12'>
        <h1 className='text-3xl font-black mb-3'>Welcome 🤗</h1>
        <p className='text-xl leading-5 text-mainTextColor'><p>Let's Sign you Up,</p>We will love to working with you.</p>
      </div>
      <form className='bg-danger '>
        <div className='bg-mainAccentColor w-fit'>
          <label htmlFor="name"><input id="name" type="text" /></label>
          <label htmlFor="email"><input id="email" type="email" /></label>
          <label htmlFor="password"><input id="password" type="password" /></label>
          <label htmlFor="password"><input id="password" type="password" /></label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUp