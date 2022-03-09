import { useState } from 'react'
import Home from "./Pages/Home/index"
import { FiMenu, FiActivity, FiFolder, FiGlobe, FiX } from "react-icons/fi"
import { IconContext } from "react-icons";
import date from 'date-and-time';
import { motion } from "framer-motion";
import './App.css'

function App() {


  const [animate, setAnimate] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" }
  };


  const toggleSwitch = () => setIsOn(!isOn);


  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  const now = new Date()

  return (
    <div className="App text-mainTextColor text-purple-600 relative">
      <nav className={`nav flex px-4 h-12 justify-between items-center fixed top-0 left-0 w-full border-b-2 border-solid border-b-borderColor bg-mainBackgroundDarkColor`}>
        <motion.div
          animate={animate ? "open" : "closed"}
          variants={variants}
          initial={{ opacity: 0 }}
          transition={{
            x: { type: "tween" },
            default: { duration: 0.6 }
          }}
          className={`${animate ? "pointer-events-auto" : "pointer-events-none"} fixed top-16 left-2 w-56 normal:w-64 sm:w-72 bg-secondaryBackgroundDarkColor border-2 border-solid border-borderColor bottom-4 rounded-2xl shadow-xl flex flex-col justify-between`}
        >
          <div>
            <div className='flex items-center justify-center mt-6 pb-6 border-b-2 border-solid border-b-borderColor'>
              <p className='text-sm text-secondaryTextColor'>{date.format(now, 'ddd, MMM DD YYYY')}</p>
            </div>

            <ul className='w-full mt-4 '>
              <li className='text-lg h-12 w-11/12 cursor-pointer mx-auto flex items-center justify-start transition-all hover:border-transparent pl-4 rounded-lg hover:bg-mainButtonColor/10'>
                <IconContext.Provider value={{ className: "text-secondaryTextColor mr-3 w-4 h-4" }}>
                  <FiGlobe />
                </IconContext.Provider>
                <span className='text-base'>Explore</span>
              </li>
              <li className='text-lg h-12 w-11/12 cursor-pointer mx-auto flex items-center justify-start transition-all mb-2 hover:border-transparent pl-4 rounded-lg hover:bg-mainButtonColor/10'>
                <IconContext.Provider value={{ className: "text-secondaryTextColor mr-3 w-4 h-4" }}>
                  <FiFolder />
                </IconContext.Provider>
                <span className='text-base'>Your Work</span>
              </li>
            </ul>
          </div>
          <footer className='flex items-center justify-center mb-8 text-tiny text-secondaryTextColor'>
            Made with 💜 in india
          </footer>
        </motion.div>
        <div className='flex h-full items-center justify-center'>
          <button onClick={() => {
            setAnimate(!animate)
          }}>
            <IconContext.Provider value={{ className: "text-mainButtonColor mr-3 w-6 h-6" }}>
              {animate ? <FiX /> : <FiMenu />}
            </IconContext.Provider>
          </button>
          <div className='nav-logo__custom-style__small w-7 h-7 rounded-md bg-gradient-to-tr from-[#f977ce] to-[#c373f2]  mr-2'>
          </div>
          <h1>Kira</h1>
        </div>
        <a className='text-mainAccentColor underline' href="http://" target="_blank" rel="noopener noreferrer">explore</a>
      </nav>
      <section className='mt-28 w-4/5 mx-auto flex flex-col justify-between items-center'>
        <h1 className='mb-8 text-base text-center'>Or, you can explore other
          people projects and threads.</h1>
        <div className="switch w-48 h-20 bg-accentDarkBg flex justify-start rounded-3xl cursor-pointer" data-isOn={isOn} onClick={toggleSwitch}>
          <motion.div className={`handle w-28 h-20 bg-mainButtonColor rounded-3xl relative ${isOn ? "before:content-['Threads']" : "before:content-['Projects']"} 
          before:absolute before:top-1/2 before:left-1/2 before:text-mainBackgroundDarkColor before:transform before:-translate-x-1/2 before:-translate-y-1/2`} layout transition={spring} />
        </div>
      </section>
      <table>
        <thead>

        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export default App
