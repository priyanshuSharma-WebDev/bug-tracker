import React from 'react'

function ProjectCard() {
    return (
        <div className='w-full h-12 border-b-2 border-solid border-b-borderColor flex items-center justify-between px-3 cursor-pointer transition-all hover:bg-mainButtonColor/10'>
            <h3 className='text-tiny text-mainTextColor cursor-pointer'>Some Name</h3>
            <span className='text-super-tiny text-secondaryTextColor cursor-pointer'>2 Mon 2022</span>
        </div>
    )
}

export default ProjectCard