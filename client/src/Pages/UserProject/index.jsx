import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { FiMoreHorizontal } from "react-icons/fi"
import { FaFilter, FaSearch, FaUserPlus } from "react-icons/fa"
import "./UserProject.css"
import Thread from '../../Components/ThreadCard'
import {Link} from "react-router-dom"
import { createProject } from '../../network-requests/project.request'
import { getLogInUser } from '../../network-requests/user.request'
import { setUser } from '../../redux-slices/user.slice'
import { useSelector, useDispatch } from 'react-redux'

function UserProject({ user, isAuth }) {


  const [projectInput, setProjectInput] = useState({projectName: "",tags: ""})
  const dispatch = useDispatch()


  function handleProjectInputs(e) {
      setProjectInput({...projectInput,[e.target.name]: e.target.value}) 
  }


  async function submitProject(e) {
    e.preventDefault();
    const projectRes = await createProject(projectInput)
    const user = await getLogInUser();
    // console.log("USER: ",user)
    dispatch(setUser({...user}))
    window.location.href="/UserProject"
    // console.log("project: ",projectRes," - user: ", data)
  }



  return (
    user && isAuth ? (
      user.isHaveProject ? (
        <div className='mt-20 w-5/6 mx-auto sm:mt-32 max-w-70rem'>
          <div className='flex justify-between items-center'>
            <h1 className='font-primaryHeading font-black text-lg  underline'>Project Name -</h1>
            <button className='rounded-full p-2 hover:bg-mainButtonColor/10 transition-all'>
              <IconContext.Provider value={{ className: "text-secondaryTextColor w-6 h-6" }}>
                <FiMoreHorizontal />
              </IconContext.Provider>
            </button>
          </div>
          <div className='flex flex-col  items-center justify-between  mt-2'>
            <input className='block w-full py-3 rounded-lg pl-6 text-lg mb-4 border-2 border-solid border-secondaryTextColor/10 bg-secondaryBackgroundDarkColor focus:border-transparent' type="text" placeholder='Search' />
            <div className='w-full flex items-center justify-between semiNormal:mt-6'>
              <button className='h-12 w-24 rounded-lg text-mainTextColor bg-mainAccentColor shadow-md cursor-pointer '>Create</button>
              <div className='flex items-center justify-between'>
                <button className='mr-2 underline w-10 h-10 flex items-center justify-center transition-all hover:bg-mainTextColor/10 rounded-full'>
                  <IconContext.Provider value={{ className: "text-secondaryTextColor w-5 h-5" }}>
                    <FaUserPlus />
                  </IconContext.Provider>
                </button>
                <button className=' underline w-10 h-10 flex items-center justify-center transition-all hover:bg-mainTextColor/10 rounded-full'>
                  <IconContext.Provider value={{ className: "text-secondaryTextColor w-4 h-4" }}>
                    <FaFilter />
                  </IconContext.Provider>
                </button>
              </div>
            </div>
            <div>
              {/* filters  */}
            </div>
            <div className='rounded-2xl w-full h-26rem sm:h-38rem min-h-20rem mx-auto max-w-70rem border-2 border-solid border-borderColor mt-8 py-2 bg-secondaryBackgroundDarkColor' >
              <div className='scrollable overflow-auto w-full h-full bg-secondaryBackgroundDarkColor  rounded-xl z-0'>
                <Thread />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='h-screen flex flex-col items-center pt-28 mb-40'>
          <div className='mb-8 px-12'>
            <h1 className='text-3xl font-black mb-3'>Humm, seems like 🧐</h1>
            <p className='text-xl leading-5 text-mainTextColor/90'><p className='mb-1'>You didn't create any project yet,</p>So, let's start with creating a new project.</p>
            <form className='Auth-form mt-16' onSubmit={submitProject}>
              <div className=' w-fit flex flex-col'>
                <label htmlFor="project-name"><p className='mb-1 ml-3 opacity-30'>Project Name</p><input name="projectName" onChange={handleProjectInputs} value={projectInput.projectName} id="project-name" className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' placeholder='Name - eg. something cool' type="text" /></label>
                <label htmlFor="tags"><p className='mb-1 ml-3 opacity-30'>Give some tags</p><input name="tags" id="tags" onChange={handleProjectInputs} value={projectInput.tags} className='h-16 normal:h-20 mb-3 w-64 normal:w-72 semiNormal:w-80 md:w-96 rounded-xl bg-secondaryBackgroundDarkColor  text-lg pl-6 outline-none' placeholder='Tags - eg. html, reactjs, nodejs, css' type="text" /></label>
              </div>
              <div className='flex flex-col  items-center justify-center mt-6'>
                <button type='submit' className='h-16 normal:h-20 text-mainBackgroundDarkColor w-52 normal:w-56 mb-4 bg-mainButtonColor rounded-xl border-none font-bold shadow-lg cursor-pointer transition duration-300 text-lg'>Create Project</button>
              </div>
            </form>
          </div>
        </div>

      )
    ) : (
      <h1 className='mt-28 text-6xl font-black text-mainTextColor text-center'>Please create account first.</h1>
    )
  )
}

export default UserProject