import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUsers } from "../../redux/actions/user";
import { getAllProjects } from "../../redux/actions/project";
import { MdCancel } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

import { acceptProject } from "../../redux/actions/project";
import { getUserMessages } from "../../redux/actions/message";
function Home() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const langue = localStorage.getItem("lan");
const {user}=useSelector(state=>state.auth)
  const {users}=useSelector(state=>state.user)
 const {projects}=useSelector(state=>state.project)
  const [showUsersList, setshowUsersList] = useState(false)
  const [showProjectsList, setshowProjectsList] = useState(false)
const [showAcceptModal, setshowAcceptModal] = useState(false)
const [showDashboard, setshowDashboard] = useState(false)
const [statistiques, setstatistiques] = useState(false)
const [notif, setnotif] = useState(false)
 const [project, setProject] = useState()
 console.log(users)
const handleShowUsersList=()=>{
  setstatistiques(false);
  setshowProjectsList(false);
  setshowUsersList(true)
  setshowDashboard(true)
  setnotif(false)
}
const handleShowProjectsList=()=>{
  setstatistiques(false);
  setshowProjectsList(true);
  setshowUsersList(false)
  setshowDashboard(true)
  setnotif(false)
}
const handleShowMessages=()=>{
  setstatistiques(false);
  setshowProjectsList(false);
  setshowUsersList(false)
  setshowDashboard(true)
  setnotif(true)
}
const handleShowStat=()=>{
  setstatistiques(true);
  setshowProjectsList(false);
  setshowUsersList(false)
  setshowDashboard(true)
  setnotif(false)
}
const getUserName=(id)=>{
  const fetchedUser=users && users.find(user=>user.id===id)
  return fetchedUser.firstname+" "+fetchedUser.lastname
}
   const handleShowAcceptProjectModal=(id)=>{
  setshowAcceptModal(true)
  setProject(id)
   }
const approuveProject=()=>{
  try{ dispatch(acceptProject(project.projectid))
    setshowAcceptModal(false)
  }
 catch(error){

 }
}
  useEffect(() => {
    if (langue === "ar") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
  }, [langue]);
  
    useEffect(() => {
      dispatch(getUsers())
      dispatch(getAllProjects())
      dispatch(getUserMessages(user.id))
    }, [dispatch])
    const NotifList=()=>{
      return (<div className="w-full h-full ">
            <div className="flex justify-start  text-2xl text-gray-900 m-5 ">
            {t("notifications")}
        </div>
      </div>)
    }
      const UsersList=()=>{
        return (  
          <div  className="    overflow-auto bg-white"   style={{maxHeight:500}} >
        <div className={`flex justify-start  text-2xl font-bold text-gray-900 m-5 `}>
            {t("usersList")}
        </div>
          <table class="w-full text-sm  mt-9   ">
  <thead>
    <tr>
      <th className="p-3">{t("email")}</th>
      <th className="p-3">{t("nom")}</th>
      <th className="p-3">{t("prénom")}</th>
      <th className="p-3">{t("job")}</th>
      <th className="p-3">{t("phone")}</th>
      <th className="p-3">{t("desactivateAccount")}</th>
      <th className="p-3">{t("deleteAccount")}</th>
      {/* <th className="p-3"></th> */}
    </tr>
  </thead>
  <tbody>
    {users && users.filter(element=>element.id!==user.id).map(user=>{
      return <tr  className="text-gray-600"key={user.id}>
        <td >{user.email}</td>
      <td className="px-7 py-7">{user.firstname}</td>
      <td className="px-7 py-7">{user.lastname}</td>
      <td className="px-7 py-7">{user.job}</td>
      <td className="px-7 py-7">{user.phone}</td>
      <td className="px-7 py-7">{t("noDesactiveRequest")}</td>
      <td className="px-7 py-7">{t("noDeleteRequest")}</td>
      
      {/* <td className=" "><button onClick={()=>handleDeleteUser(user.id)}><MdDelete className="text-2xl text-red-900"/></button></td> */}
      </tr>
    })}
   
  
  </tbody>
</table>
          </div>)
      }
   
      const ProjectsList=()=>{
        return (
          <div  className="  overflow-auto bg-white"   style={{maxHeight:500}}>
        <div className="flex justify-start text-2xl text-gray-900 m-5  ">
            {t("projectsList")}
        </div>
          <table class="w-full text-sm  mt-9  ">
  <thead>
    <tr>
      <th >{t("projectid")}</th>
      <th >{t("titre")}</th>
      <th >{t("description")}</th>
      <th >{t("createdBy")} </th>
      <th >{t("createsAt")} </th>
      <th > {t("approved")}</th>
      
    </tr>
  </thead>
  <tbody>
    {projects  && projects.map(project=>{
      return <tr  className="text-gray-600" key={project.id}>
      <td className="p-3">{project.projectid}</td>
      <td className="p-3" >{project.project_title}</td>
      <td  className="p-3">{project.project_description}</td>
      <td  className="p-3">{getUserName(project.user)}</td>
      <td  className="p-5  w-36 ">{project.created_at && project.created_at.slice(0,10)}</td>
<td className="p-3">
  {project.approved  ? (
    <MdCheckCircle className="text-green-900" />
  ) : (
    <div className="flex">
      <MdCancel className="mt-1 mr-1 text-red-900" />
      <button onClick={()=>handleShowAcceptProjectModal(project)}>{t("accept")}</button>
    </div>
  )}
</td>
     
      </tr>
    })}
   
  
  </tbody>
</table>
          </div>)
      }
       
       
    
          const StatList=()=>{
            return (
            
            <div className="w-full h-full  ">
                  <div className="flex justify-start  text-2xl text-gray-900 m-5 ">
                 
              </div>
            </div>)
          }
        
  return (
   
      
      <div className={` p-8   ${showAcceptModal?'bg-red-200':"bg-white"}` } style={{minHeight:"100vh" ,overflowY:"auto"}} >

      <div className="flex justify-center text-3xl text-gray-900 m-5 font-bold lemon-regular">
            {t("adminSpace")}
      </div>
      <div className="flex  w-full  h-full  ">
     {showDashboard && <div className="fixed top-20 p-3 rounded  hover:bg-white hover:text-black hover:border  hover:font-bold text-white  bg-gray-700"><button onClick={()=>setshowDashboard(false)}>Voir dashboard</button></div> } 
           {!showDashboard &&  <div className="flex   fixed z-10 w-80 flex-col  bg-gray-800   h-full   p-10 items-center rounded  ">  
                  <button className=" hover:bg-white hover:text-black hover:font-bold  bg-gray-800 rounded  text-white border shadow   w-60 p-4 h-auto m-2" onClick={handleShowUsersList} >
              {t("usersList")}
                  </button>
                  <button className=" bg-gray-800 rounded  hover:bg-white hover:text-black hover:font-bold w-60 text-white border shadow  p-4 h-auto m-2" onClick={handleShowProjectsList} >
              {t("projectsList")}
                </button>
                <button className=" bg-gray-800 rounded  hover:bg-white hover:text-black hover:font-bold w-60 text-white border shadow  p-4 h-auto m-2" onClick={handleShowStat} >
                {t("stat")}
                </button>
                <button className=" bg-gray-800 rounded  hover:bg-white hover:text-black hover:font-bold w-60 text-white border shadow  p-4 h-auto m-2" onClick={handleShowMessages} >
                {t("notifications")}
                </button>
            </div>} 
            <div className="   fixed w-full  h-full  flex justify-center  px-10 py-8 ">
          {showUsersList && <UsersList/>}
          {showProjectsList && <ProjectsList/>}
          {notif &&  <NotifList/>}
          {statistiques && <StatList/>}
            </div>
      </div>
      {showAcceptModal && <div  className="fixed top-20  flex justify-center items-center w-full h-24">
        <div className="   w-60   h-28  shadow rounded-sm bg-white  p-6 "> <div className="mb-3">Accepter ce projet?</div>
               <div className="flex justify-center ">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-20  " onClick={approuveProject} >Oui</button>
                <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-20 ml-2" onClick={()=>setshowAcceptModal(false)}>Non</button>
               </div></div>
              
      </div>}
         
        </div> 
    
     
     
    
  );
}

export default Home;
