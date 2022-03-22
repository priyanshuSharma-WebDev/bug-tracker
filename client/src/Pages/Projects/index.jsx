import React from 'react'
import { IconContext } from 'react-icons'
import { FiMoreHorizontal } from "react-icons/fi"
import ProjectCard from "../../Components/ProjectCard/index"
import "./Project.css"

function Projects() {
  return (
    <div className='mt-20 w-5/6 mx-auto sm:mt-32 max-w-70rem'>
      <div className='flex justify-between items-center'>
        <h1 className='font-primaryHeading font-black text-lg  underline'>Project Name -</h1>
        <button className='rounded-full p-2 hover:bg-mainButtonColor/10 transition-all'>
          <IconContext.Provider value={{ className: "text-secondaryTextColor w-6 h-6" }}>
            <FiMoreHorizontal />
          </IconContext.Provider>
        </button>
      </div>
      <div className='rounded-2xl w-full h-26rem sm:h-46rem min-h-20rem mx-auto border-2 border-solid border-borderColor mt-16 py-2 bg-secondaryBackgroundDarkColor' >
        <div className='scrollable overflow-auto w-full h-full bg-secondaryBackgroundDarkColor  rounded-xl z-0'>
          <>
            <ProjectCard />
          </>
        </div>
      </div>
    </div>
  )
}

export default Projects