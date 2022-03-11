import React,{useState} from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { IconContext } from "react-icons";
import  "./Navbar.css"
import Sidebar from "./Sidebar/index";
import Profile from "../Profile/index";

export default function Navbar() {


  const [animate, setAnimate] = useState(false);


  return (
      <nav className={`nav flex px-4 h-14 justify-between items-center fixed top-0 left-0 w-full border-b-2 border-solid border-b-borderColor bg-mainBackgroundDarkColor`}>
        <Sidebar animate={animate}  />
        <div className='flex h-full items-center justify-center'>
          <button onClick={() => {
            setAnimate(!animate)
          }}>
            <IconContext.Provider value={{ className: "text-mainButtonColor mr-3 w-6 h-6" }}>
              {animate ? <FiX /> : <FiMenu />}
            </IconContext.Provider>
          </button>
          <div className='nav-logo__custom-style__small  w-7 h-7 rounded-md bg-gradient-to-tr from-[#f977ce] to-[#c373f2]  mr-2'>
          </div>
          <h1 className="text-tiny sm:text-base md:text-lg">Kira</h1>
        </div>
          <Profile />
        {/* <a className='text-mainAccentColor underline text-tiny' href="http://" target="_blank" rel="noopener noreferrer">explore</a> */}
      </nav>
  )
}
