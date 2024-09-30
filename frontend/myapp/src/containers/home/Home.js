import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { PiSmileyWinkLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { getAllProjects } from "../../redux/actions/project";
import { getUsers } from "../../redux/actions/user";
import { getLikes } from "../../redux/actions/like";
import ProjectItem from "../project/ProjectItem";
import { IoIosAddCircle } from "react-icons/io";
import {  useNavigate } from "react-router-dom";
import { refreshToken } from "../../redux/actions/auth";
import FormContact from "./FormContact";
function Home() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { t } = useTranslation();
  const { projects } = useSelector((state) => state.project);
  const { likes } = useSelector((state) => state.like);
  const { users } = useSelector((state) => state.user);
  const [showUser, setshowUser] = useState(true)
  const [themes, setthemes] = useState()
  const {user}=useSelector(state=>state.auth)  
  const langue = localStorage.getItem("lan");
  const [show, setShow] = useState(false);
  const [showLikeandMessage, setShowLikeandMessage] = useState(true);
  const [project, setProject] = useState("");
  const [theme, settheme] = useState("")

   const handleShow = (element) => {
    setShow(true);
    setProject(element);
  };

  const getUserName = (id) => {
    const user = users.find((element) => element.id === id);
    return user ? `${user.firstname} ${user.lastname}` : "";
  };

  const getUserImage = (id) => {
    const user = users.find((element) => element.id === id);
    return user ? user.profile_img : "";
  };

  const getLikesNumber = (id) => {
    const likesNumber = likes.filter((like) => like.id_project === id);
    return likesNumber.length;
  };

  useEffect(() => {
    if (langue === "ar") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
  }, [langue]);
  
  const getProjectsTheme=()=>{
    const themes=[]
   projects && projects.filter(project=>project.user!==user.id).forEach(element => {
          themes.push((element.project_description).trim().split(/[،,]/)[0])
          themes.push((element.project_description).trim().split(/[،,]/)[1])
    });
    const uniqueThems=new Set(themes)
    const filteredThemes=[...uniqueThems]
    setthemes(filteredThemes)
  }
  
  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getUsers());
    dispatch(getLikes());
    getProjectsTheme()
  }, [dispatch]);
  return (
    <div>
      
        <div className="px-10 py-20 bg-white border-1 shadow gap-10 ">
          {user.user_role!=="Admin" && <div className="flex justify-end"><button className="flex" onClick={()=>navigate("/create/project")}><IoIosAddCircle className="text-5xl" /></button></div>}
          <div className="flex justify-center text-5xl text-gray-900 m-10 font-bold lemon-regular">
            {t("listTitle1")}
          </div>
          <div className="flex justify-center text-3xl font-semibold m-10">
            {t("listTitle2")}
          </div>
          <div className="flex justify-center text-2xl font-semibold m-10 lemon-regular">
            {t("free")}
            <PiSmileyWinkLight className="text-4xl px-1" />
          </div>
          <div className="flex flex-wrap">
          <button className=" bg-gray-800 rounded  text-white border shadow w-auto p-4 h-auto m-2" onClick={()=>settheme("")}>
              {t("tous")}
            </button>
            {themes && themes.map(theme=>{
              return(
                <button className=" bg-gray-800 rounded  text-white border shadow w-auto p-4 h-auto m-2" onClick={()=>settheme(theme)}>
                {theme}
            </button>
              )
            })}
           
          </div>
          <div className="flex mt-40 m-2 flex-wrap p-2">
            {projects && user && projects
              .filter((element) => element.user !== user.id && element.project_description.includes(theme))
              .map((element) => (
                <div className="relative  m-3" key={element.projectid}>
                  <img
                    src={element.images[1]}
                    alt=""
                    className=" m-5 inline-block"
                    onClick={() => handleShow(element)}
                    style={{ height: 280, width: 390 }}
                  />
                  <div className="absolute bottom-0 w-full left-5 text-sm text-gray-900 font-bold">
                    <div className="mx-1 flex mt-5 relative">
                      <img
                        src={getUserImage(element.user)}
                        alt=""
                        className="rounded-full h-4 w-4 mt-1 mr-2"
                      />
                      <p className="mr-">{getUserName(element.user)}</p>
                      <p className="flex absolute right-8">
                        {getLikesNumber(element.projectid)}
                        <AiOutlineLike className="h-5" />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
            {user.role==="User" && <FormContact/>} 
          </div>
        </div>
      
      {show && (
        <ProjectItem
          project={project}
          setshow={setShow}
          showUser={showUser}
          showLikeandMessage={showLikeandMessage}
        />
      )}
     

  
    </div>
  );
}

export default Home;
