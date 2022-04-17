import Home from "./Pages/Home/index"
import Navbar from "./Components/Navbar/index"
import Projects from "./Pages/Projects/index"
import './App.css'
import Thread from "./Pages/Thread/index"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserProject from "./Pages/UserProject"
import SignUp from "./Pages/Auth/SignUp/index"
import SignIn from "./Pages/Auth/SignIn/index"
import Reset_Password from "./Pages/Auth/Reset_Password/index"


function App() {

  return (
    <div className="App text-mainTextColor text-purple-600 relative pb-16 h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Reset_Password" element={<Reset_Password />} />
          <Route path="/project" element={<h1 style={{marginTop: "200px", textAlign: "center"}}>It should fetch some bugs here related to the corresponding project:D</h1>} />
          <Route path="/thread" element={<Thread />} />
          <Route path="/UserProject" element={<UserProject />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
