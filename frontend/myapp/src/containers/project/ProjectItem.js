import React, { useState } from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom"
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import DeleteProject from "./DeleteProject";
import {useDispatch, useSelector} from "react-redux"
import { addLike } from "../../redux/actions/like";
import { getLikes } from "../../redux/actions/like";
import { getUsers } from "../../redux/actions/user";
import Contact from "../contact/Contact";
function ProjectItem({ project, setshow,showDeleteBtn,showLikeandMessage,showUser,showDeleteModal,setshowDeleteModal }) {
  const {user}=useSelector(state=>state.auth)
  const {users}=useSelector(state=>state.user)
  const [id, setid] = useState()
  const [showLike, setshowLike] = useState(true)
  const [showContactModel, setshowContactModel] = useState(false)
  const dispatch=useDispatch()
  const {likes}=useSelector(state=>state.like)
  const closeModal = () => {
    setshow(false);
  };
  const handleDeleteModal=(id)=>{
    setshowDeleteModal(true);
    setid(id)
  }
  const handleAddLike=()=>{
    const userData={userId:user.id,projectId:project.projectid}
  dispatch(addLike({userData}))
setshow(false)
  }
  useEffect(() => {
   dispatch(getLikes())
   dispatch(getUsers())
  }, [dispatch])
  
  const { t } = useTranslation();
  const getUserLike=()=>{
    const result= likes.find(element=>element.id_user===user.id && element.id_project===project.projectid)
   if(result){
    setshowLike(false)
   }
  }
  useEffect(() => {
   getUserLike()
  }, [])
  const handleShowContactModel=()=>{
    setshowContactModel(true)
  
  }
  const getUserName=(id)=>{
    const user=users.find(user=>user.id===id)
    return user &&  `${user.firstname} ${user.lastname}`
  }
  const getUserImage=(id)=>{
   const user=users && users.find(element=>element.id===id);
   return user && user.profile_img ;
  }
  return (
    < div  className="bg-red-500"  >
<div class={`shadow border-2     project_item  p-5 rounded-2xl bg-gray-900  overflow-y-auto  `}>
<button onClick={closeModal}>
          <IoIosClose class="text-5xl absolute right-0 top-1 text-white" />
        </button>
      
    <div className="flex "> {showUser &&<>
      <img src={getUserImage(project.user)} className="rounded-full  h-16 w-16"/>
      <div class="py-2 text-3xl text-white  ml-3">{getUserName(project.user)}-</div></> } 
      <div className=" py-2 text-2xl text-white mt-1">{project.project_title}</div>
      {showLikeandMessage && (
        <div className=" absolute right-10 top-2">
         <button className="text-white  mr-7 text-sm  " onClick={handleAddLike}>
        {showLike ? (  <div className="" ><AiOutlineLike class="text-white text-3xl    " /> {t("like")} </div>) :( <div ><AiOutlineDislike class="text-white text-3xl "/>{t("deslike")}</div>)}
           
          </button>
          <button className="text-white  text-sm ">
            <FaRegMessage class="text-white text-2xl ml-3 " onClick={handleShowContactModel} />
            {t("contact")}
          </button>
        </div>
      )}
      </div>
    


      <div className="mt-3">
      {project.images.map((element) => {
        return (
          <img
            src={element}
            key={element._id}
            alt=""
            class=" text-1xl flex justify-center  h-96 w-full"
          />
        );
      })} 
      </div>
      {showDeleteBtn && <button className="bg-red-600 text-white py-2  mt-3 rounded-sm px-3" onClick={()=>handleDeleteModal(project.project_id)}>{t("deleteProject")}</button>}
      {showDeleteModal &&  <div className="flex fixed top-0 left-0 right-0 bottom-0 z-50 bg-white "> <DeleteProject setshowDeleteModal={setshowDeleteModal} id={id} setshow={setshow}/> </div> } 
</div>
        
 
    

  
   
   {showContactModel && <div  className="fixed top-0 left-0 right-0  bottom-0 z-50 bg-black flex"> <Contact idUser={project.user}  setshowContactModel={setshowContactModel}/> </div>}
    </div>
  );
}

export default ProjectItem;
