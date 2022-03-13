import React from 'react'
import {FaReact} from "react-icons/fa"
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

function ProjectCard() {
    return (
        <Link to="/project" className='w-full h-12 sm:h-20 sm:px-12 border-b-2 border-solid border-b-borderColor flex items-center justify-between px-3 cursor-pointer transition-all hover:bg-mainButtonColor/10'>
          <div className='flex justify-between items-center'>
              <IconContext.Provider value={{ className: "text-success mr-3 w-4 h-4 sm:w-5 sm:h-5" }}>
                <FaReact />
            </IconContext.Provider>
            <div className='flex flex-col items-start'>
                <h3 className='text-base text-mainTextColor cursor-pointer sm:text-lg'>Some Name</h3>
                <small className='text-super-tiny text-secondaryTextColor sm:text-tiny' >nodejs / reactjs / mongodb</small>
            </div>
          </div> 
            <span className='text-super-tiny text-secondaryTextColor cursor-pointer sm:text-tiny sm:mt-1'>2 Mon 2022</span>
        </Link>
    )
}

export default ProjectCard