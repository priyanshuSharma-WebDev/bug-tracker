import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../../network-requests/user.request'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css"

const initialState = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
}

function SignUp() {

  let navigate = useNavigate();
  const [HandleInput, setHandleInput] = useState(initialState)


  function ListenForInputChanges(e) {
    setHandleInput({ ...HandleInput, [e.target.name]: e.target.value })
  }


  async function ListenForFormSubmit(e) {
    e.preventDefault()
    try {
      if(JSON.stringify(HandleInput) === JSON.stringify(initialState) ) {
        return toast.error("Input fields cannot be empty.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10000,
          theme: 'dark',
          pauseOnHover: true,
          delay: 200,
          hideProgressBar: false
        });
      }
      const res = await createUser(HandleInput)
      if(res.status === 200) {
        toast.success("Please confirm your email.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10000,
          theme: 'dark',
          pauseOnHover: true,
          delay: 200,
          hideProgressBar: false
        });
        setHandleInput(initialState)
      }
      else {
          throw new Error(res.msg)
      }
    }
    catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 10000,
        theme: 'dark',
        pauseOnHover: true,
        delay: 200,
        hideProgressBar: false
      });
    }
  }


  return (
    <div className='h-screen flex flex-col items-center pt-28 mb-40'>
      <div className='mb-8 px-12'>
        <h1 className='text-3xl font-black mb-3'>Welcome 🤗</h1>
        <p className='text-xl leading-5 text-mainTextColor'><p className='mb-1'>Let's Sign you Up,</p>We will love to working with you.</p>
      </div>
      <form className='Auth-form mt-6' onSubmit={ListenForFormSubmit}>
        <div className=' w-fit flex flex-col'>
          <label htmlFor="name"><p className='mb-1 ml-3 opacity-30'>Name</p><input onChange={ListenForInputChanges} value={HandleInput.fullname} name="fullName" id="name" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' placeholder='Name - eg. Jhon Doe' type="text" /></label>
          <label htmlFor="username"><p className='mb-1 ml-3 opacity-30'>Username</p><input onChange={ListenForInputChanges} value={HandleInput.username} name="username" id="username" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' placeholder='Username - eg. @jhonDoe' type="text" /></label>
          <label htmlFor="email"><p className='mb-1 ml-3 opacity-30'>Email</p><input onChange={ListenForInputChanges} value={HandleInput.email} name="email" id="email" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' type="email" placeholder='Email - eg.jhonDoe@gmail.com' /></label>
          <label htmlFor="password"><p className='mb-1 ml-3 opacity-30'>Password</p><input onChange={ListenForInputChanges} value={HandleInput.password} name="password" id="password" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' type="password" placeholder='Password - eg. ljfw3094wojf' /></label>
          <label htmlFor="password"><p className='mb-1 ml-3 opacity-30'>Confirm Password</p><input onChange={ListenForInputChanges} value={HandleInput.confirmPassword} name="confirmPassword" id="password" className='h-16 normal:h-20 mb-2 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' type="password" placeholder='Password - eg. ljfw3094wojf' /></label>
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