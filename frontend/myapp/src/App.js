import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./containers/register/SignUp";
import SignIn from "./containers/login/SignIn";
import Profile from "./containers/profile/Profile";
import {useState } from "react";
import Project from "./containers/project/Project";
import ProjectList from "./containers/project/ProjectList";
import Home from "./containers/home/Home";
import PrivateRoutes from "./utils/PrivateRoute";
import Update from "./containers/profile/Update";
import Footer from "./components/Footer/Footer";
import UpdatePassword from "./containers/profile/UpdatePassword";
import Contact from "./containers/contact/Contact";
import Messages from "./containers/contact/Messages";
import {  useSelector } from "react-redux";
import Dashboard from "./containers/adminSpace/Dashboard";


function App() {
 
  const [color, setcolor] = useState(false);
  const [handleshow, sethandleshow] = useState(true)



  
  return (
    <div className="App">
    
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/home"
            element={
              <Home sethandleshow={sethandleshow} handleshow={handleshow} />
            }
          ></Route>
          <Route
            path="/profile"
            color={color}
            setcolor={setcolor}
            element={<Profile />}
          ></Route>
          <Route
            path="/projects"
            element={
              <ProjectList
                sethandleshow={sethandleshow}
                handleshow={handleshow}
              />
            }
          ></Route>
          <Route path="/create/project" element={<Project />}></Route>
          <Route path="/update/profile" element={<Update />}></Route>
          <Route path="/update/password" element={<UpdatePassword />}></Route>
          <Route path="/send/message" element={<Contact />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/messages" element={<Messages />}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
