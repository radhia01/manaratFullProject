import React from 'react'
import { deleteProject } from '../../redux/actions/project'
import {useDispatch, useSelector} from "react-redux"
import "./style.css";
import { useTranslation } from "react-i18next";
function DeleteProject({setshowDeleteModal,id,setshow}) {
    const { t } = useTranslation()
    const {token}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const handleDeleteProject=()=>{
        dispatch(deleteProject({id}))
        setshow(false)
    }
    
  return (
    <div className="     m-auto  w-2/4   h-36   bg-black text-white    rounded  shadow-sm'">
    <h1 className='text-1xl font-bold text-center py-3'>{t("confirmDelete")}</h1>
    <hr ></hr>
    <div className="flex justify-center items-center h-full  bg-black">
      <button className="bg-red-700 py-2 px-2 m-2 rounded-sm w-36" onClick={handleDeleteProject}>{t("Oui")}</button>
    <button className="bg-red-700 py-2 px-2 rounded-sm  w-36" onClick={()=>setshowDeleteModal(false)}>{t("Non")}</button></div>
    
</div>
  )
}

export default DeleteProject