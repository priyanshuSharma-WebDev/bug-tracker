import { useState } from 'react'
import { FiMenu } from "react-icons/fi"
import { IconContext } from "react-icons";
import './App.css'

function App() {

  return (
    <div className="App text-mainTextColor text-purple-600 relative">
      <nav className='flex px-4 h-12 justify-between items-center fixed top-0 left-0 w-full border-b-2 border-solid border-b-borderColor bg-mainBackgroundDarkColor'>
        <div className='flex h-full items-center justify-center'>
          <button>
            <IconContext.Provider value={{ className: "text-mainButtonColor mr-3 w-6 h-6" }}>
              <FiMenu />
            </IconContext.Provider>
          </button>
          <h1>Logo</h1>
        </div>
        <a className='text-mainAccentColor underline' href="http://" target="_blank" rel="noopener noreferrer">explore</a>
      </nav>
      <section className='mt-16'>
        <h1>Or, you can explore other
          people projects and threads.</h1>
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
