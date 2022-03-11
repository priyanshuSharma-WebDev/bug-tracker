import Home from "./Pages/Home/index"
import Navbar from "./Components/Navbar/index"
import Project from "./Pages/Project/index"
import './App.css'
import Thread from "./Pages/Thread/index"

function App() {

  return (
    <div className="App text-mainTextColor text-purple-600 relative pb-16">
      <Navbar />
      <Project />
    </div>
  )
}

export default App
