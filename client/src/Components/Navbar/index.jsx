import React, { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { IconContext } from "react-icons";
import "./Navbar.css"
import Sidebar from "./Sidebar/index";
import Profile from "../Profile/index";
import { Link } from "react-router-dom";

export default function Navbar({ user, isAuth }) {

  const [animate, setAnimate] = useState(false);

  return (
    <nav className={`nav flex pl-2 pr-6 h-14 justify-between items-center fixed top-0 left-0 w-full border-b-2 border-solid border-b-borderColor bg-mainBackgroundDarkColor md:px-20`}>
      <Sidebar animate={animate} setAnimate={setAnimate} />
      <div className={`flex h-full items-center justify-center px-4 rounded-xl transition duration-300 transform ${animate && "bg-mainButtonColor/10 scale-75"}`}>
        <button onClick={() => {
          setAnimate(!animate)
        }}>
          <IconContext.Provider value={{ className: "text-mainButtonColor mr-3 md:mr-6 w-6 h-6" }}>
            <FiMenu />
          </IconContext.Provider>
        </button>
        <Link to="/" className='nav-logo__custom-style__small  w-7 h-7 rounded-md bg-gradient-to-tr from-[#f977ce] to-[#c373f2]  mr-2'>
        </Link>
        <Link to="/" className="text-tiny sm:text-base md:text-lg">Kira</Link>
      </div>
      {
        !isAuth ? (
       <a className='text-mainAccentColor underline text-tiny' href="http://" target="_blank" rel="noopener noreferrer">explore</a>
        ): (
        <Profile user={user} />
        )
      }
    </nav>
  )
}
