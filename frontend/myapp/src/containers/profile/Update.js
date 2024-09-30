import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux'

import axios from "../../axios/axios"
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message'
import { updateProfile } from '../../redux/actions/user'
import Loading from '../../components/Loading/Loading'
import { updateUserProfileImage } from '../../redux/actions/auth'
function Update() {
    const dispatch=useDispatch()
    const [files, setfiles] = useState()
    const navigate=useNavigate()
    const userData=useSelector(state=> state.auth.user)
    const [user, setuser] = useState(userData)
    const [message, setmessage] = useState(null)
    const [showConfirmImageUpdate, setshowConfirmImageUpdate] = useState(false)
    const [userImage, setuserImage] = useState(user.profile_img)
  const langue=localStorage.getItem("lan")
const {t}=useTranslation();
const goToProfil = () => {
    navigate("/profile");
  };
  const handleChange=(e)=>{
    setuser({
        ...user,
        [e.target.name]: e.target.value
    })
    
  }
  useEffect(() => {
  setmessage(null)
  }, [user])
  
const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(updateProfile({id:userData.id,data:user}))
    setmessage(t("successMessage"))

}
const handleSelect=(e)=>{
    setfiles(e.target.files[0])
}
const handleChangeImage=async()=>{
  if(files){
    try{
      const form=new FormData();
    form.append("file",files)
    const response=await axios.post(`http://localhost:3001/api/users/upload/image/${user.id}`,form);
       setuserImage(response.data.profile_img)
       setshowConfirmImageUpdate(false)
       dispatch(updateUserProfileImage(response.data.profile_img))
    }
  
    catch(error){
  console.log(error)
    }}
}

useEffect(() => {
   if (files){
  setshowConfirmImageUpdate(true)
   }
}, [files])
useEffect(() => {

    if (langue === "ar") {
      window.document.dir = "rtl";
    } else {
      window.document.dir = "ltr";
    }
  }, [langue])

  return (
    

        <div className="border relative bg-white  flex  justify-center gap-7  my-16">
             {}
            <div className="m-6 flex ">
                <div className=""><img  className='avatar w-60 h-60 rounded-full ' src={userImage}/>
                <button className=' bg-sky-800 rounded p-2 text-white m-2' onClick={()=>document.getElementById("inputFile").click()}>{t("update")}</button></div>
           <div className=""> <div className="text-3xl text-gray-900 mb-10 lemon-regular">{t("MettreAJOURPROFILE")}</div>
            <button
          class="bg-blue-500 rounded-3xl py-1 px-2 text-white text-sm font-bold absolute right-1 top-1 "
          onClick={goToProfil}
        >
          {t("back")}
        </button>
            <div className="flex justify-center m-3  ">
               <div className="w-60 text-gray-900"> <label  className='text-gray-500'>{t("nom")}</label></div>
                <input
                type="text"
                className='w-60 h-10 border p-2'
                defaultValue={user && user.firstname}
                name="firstname"
                onChange={handleChange}
                  >
                </input>
            </div>
            <div className="flex justify-center m-3 ">
               <div className="w-60 text-gray-900"> <label className='text-gray-500'>{t("prenom")}</label></div>
                <input
                type="text"
                className='w-60 h-10 border p-2'
                defaultValue={user && user.lastname}
                name="lastname"
                onChange={handleChange}
                  >
                </input>
            </div>
            <div className="flex justify-center  m-3">
               <div className="w-60 text-gray-900"> <label  className='text-gray-500'>{t("email")}</label></div>
                <input
                type="text"
                className='w-60 h-10 border p-2'
                defaultValue={user && user.email}
                name="email"
                onChange={handleChange}
                  >
                </input>
            </div>
            <div className="flex justify-center m-3 ">
               <div className="w-60 text-gray-900"> <label  className='text-gray-500'>Adresse</label></div>
                <input
                type="text"
                className='w-60 h-10 border p-2'
                defaultValue={user && user.adress}
                name="adress"
                onChange={handleChange}
                  >
                </input>
            </div>
            <div className="flex justify-center m-3 ">
               <div className="w-60 text-gray-900"> <label  className='text-gray-500'>Télephone</label></div>
                <input
                type="text"
                className='w-60 h-10 border p-2'
                defaultValue={user && user.phone}
                name="phone"
                onChange={handleChange}
                  >
                </input>
            </div>
            <div className="flex justify-center m-3 ">
               <div className="w-60 text-gray-900"> <label  className='text-gray-500'>Profession</label></div>
                <input
                type="text"
                className='w-60 h-10 border p-2'
                defaultValue={user && user.job}
                name="job"
                onChange={handleChange}
                  >
                </input>
            </div>
            <div className='m-4'>
                <button className=' w-52 bg-sky-900 rounded-xl p-3 text-white ' type="submit" onClick={handleSubmit}>{t("mettreajour")} </button>
            </div></div> 
           
          
            </div>
            {message && <Message message={message}/>}
            <div className=""><input type="file" id="inputFile" style={{display:"none"}} onChange={handleSelect}
            
            /></div>
            {showConfirmImageUpdate &&  <div className='bg-white text-gray-900 border-2  w-72 h-auto fixed mx-auto  top-10 right-0 left-0 p-4 '>
              <div> {t("updateProfilePictureMessage")} ?</div> 
              <div className='mt-3'> <button className=' bg-teal-800 rounded w-20 ml-2' onClick={handleChangeImage}>{t("Oui")}</button>
              <button className='  bg-red-700 rounded w-20 ml-2' onClick={()=>setshowConfirmImageUpdate(false)}>{t("Non")}</button></div></div>}
        </div>
   
  )
}

export default Update