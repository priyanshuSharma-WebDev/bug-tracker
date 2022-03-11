import React, { useState } from 'react'
import ProjectCard from '../../Components/ProjectCard/index.jsx'
import Thread from '../../Components/ThreadCard/index.jsx'
import ToogleSwitch from '../../Components/Toogle-Switch/index.jsx'

function Home() {

  const [isOn, setIsOn] = useState(false);

  return (
    <>
      <section className='mt-28 w-4/5 mx-auto flex flex-col justify-between items-center'>
        <h1 className='mb-8 text-base text-center max-w-20rem md:text-lg'>Or, you can explore other
          people projects and threads.</h1>
        <ToogleSwitch isOn={isOn} setIsOn={setIsOn} />
      </section>
      <div className='filter'>
        {/* this space is for filter btn */}

      </div>
      <div className='rounded-2xl w-5/6 h-26rem sm:h-38rem min-h-20rem mx-auto max-w-70rem border-2 border-solid border-borderColor mt-16 py-2 bg-secondaryBackgroundDarkColor' >
        <div className='scrollable overflow-auto w-full h-full bg-secondaryBackgroundDarkColor  rounded-xl z-0'>
          {
            !isOn ? (
              <>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
              </>
            ) : (
              <Thread />
            )
          }
        </div>
      </div>
    </>
  )
}

export default Home
