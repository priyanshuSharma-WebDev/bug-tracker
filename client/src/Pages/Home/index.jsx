import React,{useState} from 'react'
import Navbar from "../../Components/Navbar/index.jsx"
import ProjectCard from '../../Components/Project/index.jsx'
import Thread from '../../Components/Threads/index.jsx'
import ToogleSwitch from '../../Components/Toogle-Switch/index.jsx'

function Home() {

  const [isOn, setIsOn] = useState(false);

  return (
    <>
      <Navbar />
      <section className='mt-28 w-4/5 mx-auto flex flex-col justify-between items-center'>
        <h1 className='mb-8 text-base text-center'>Or, you can explore other
          people projects and threads.</h1>
          <ToogleSwitch isOn={isOn} setIsOn={setIsOn} />
      </section>
      <div className='filter'>
          {/* this space is for filter btn */}
      </div>
      <div className='w-5/6 h-26rem min-h-20rem mx-auto mt-8 overflow-y-auto'>
        {
          !isOn ? (
            <ProjectCard />
          ) : (
            <Thread />
          )
        }
      </div>
    </>
  )
}

export default Home
