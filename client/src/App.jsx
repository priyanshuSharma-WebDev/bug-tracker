import Home from "./Pages/Home/index"
import Navbar from "./Components/Navbar/index"
import Project from "./Pages/Project/index"
import './App.css'
import Thread from "./Pages/Thread/index"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div className="App text-mainTextColor text-purple-600 relative pb-16">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/thread" element={<Thread />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
