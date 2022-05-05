import Home from "./Pages/Home/index"
import Navbar from "./Components/Navbar/index"
import Projects from "./Pages/Projects/index"
import './App.css'
import Thread from "./Pages/Thread/index"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import UserProject from "./Pages/UserProject"
import SignUp from "./Pages/Auth/SignUp/index"
import SignIn from "./Pages/Auth/SignIn/index"
import Reset_Password from "./Pages/Auth/Reset_Password/index"
import {ToastContainer} from "react-toastify"
import { useSelector } from 'react-redux';
import { store } from './store'
import { Provider } from 'react-redux'


function App() {

  const {user, isAuth} = useSelector((state) => state.userSlice);

  return (
    <div className="App text-mainTextColor text-purple-600 relative pb-16 h-screen">
      <BrowserRouter>
        <Navbar user={user} isAuth={isAuth}  />
{/*  */}
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <ProtectedRoute path="/SignUp">
            <SignUp />
          </ProtectedRoute>
          <ProtectedRoute path="/SignIn">
            <SignIn />
          </ProtectedRoute> */}
          <Route path="/Reset_Password" element={<Reset_Password />} />
          <Route path="/project" element={<h1 style={{marginTop: "200px", textAlign: "center"}}>It should fetch some bugs here related to the corresponding project:D</h1>} />
          <Route path="/thread" element={<Thread />} />
          <Route path="/UserProject" element={<UserProject />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


const ProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.userSlice);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/SignIn',
                            state: { from: location },
                        }}
                    />
                ) : 
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />;
            }}
        ></Route>
    );
};

export default App
