import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import axios from "../../axios/axios"
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message'
function UpdatePassword() {
    const navigate=useNavigate()
    const userData=useSelector(state=>state.auth.user)
    const [user, setuser] = useState(userData);
    const [message, setmessage] = useState(null)
    const langue = localStorage.getItem("lan");
    const [lastPassword, setlastPassword] = useState()
    const [newPassword, setnewPassword] = useState();
    const [confirmedNewPassword, setconfirmedNewPassword] = useState()
const {t}=useTranslation();
const goToProfil = () => {
    navigate("/profile");
  };
 
  useEffect(() => {
  setmessage(null)
  }, [user])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage(null)
    const email=user.email;
    try {
    await axios.patch(`https://manarat-api.vercel.app/api/update/password/users/${user.id}`);
      setmessage("Votre mot de passe a été mis à jour avec succès");
    } catch (error) {
      if (error.response && error.response.data.error) {
        const errorCode = error.response.data.error;
        let errorMessage = "";
  
        switch (errorCode) {
          case "MUST_8_CARACTERS":
          errorMessage =t("MUST_8_CARACTERS");
          break;
          case "MUST_NOT_CONTENT_EMAIL":
            errorMessage =t("MUST_NOT_CONTENT_EMAIL");
            break;
          case "MUST_CONTENT_LOWER_AND_LOWER":
            errorMessage =t("MUST_CONTENT_LOWER_AND_LOWER");
            break;
          case "USER_Not_Found":
            errorMessage =t("invalidPasswordError");
            break;
          case "Invalid_Password":
            errorMessage =t("invalidPasswordError");
            break;
          case "Passwords_not_matches":
            errorMessage = t("userNotFoundError");
            break;
          default:
            errorMessage = t("messageError");
        }
  
        setmessage(errorMessage);
      } else {
        setmessage(t("messageError"));
      }
    }
  };
  

useEffect(() => {

  if (langue === "ar") {
    window.document.dir = "rtl";
  } else {
    window.document.dir = "ltr";
  }
}, [langue])



  return (
    

        <div className="border relative bg-white    flex  justify-center items-center " style={{height:"100vh"}}>
           
            <div className="m-6 flex  ">
    
           <div className=""> <div className="text-3xl text-gray-900 mb-10 lemon-regular">{t("editPassword")}</div>
            <button
          class="bg-blue-500 rounded-3xl py-1 px-2 text-white text-sm font-bold absolute right-1 top-1 "
          onClick={goToProfil}
        >
          {t("back")}
        </button>
            <div className="flex justify-center m-3  ">
               <div className="w-60 text-gray-900"> <label  className='text-gray-500'>{t("lastPassword")}</label></div>
                <input
                type="password"
                className='w-60 h-10 border p-2'
                name="lastPassword"
                onChange={(e)=>setlastPassword(e.target.value)}
                  >
                </input>
            </div>
            <div className="flex justify-center m-3 ">
               <div className="w-60 text-gray-900"> <label className='text-gray-500'>{t("newPassword")}</label></div>
                <input
                type="password"
                className='w-60 h-10 border p-2'
                name="newPassword"
                onChange={(e)=>setnewPassword(e.target.value)}
                  >
                </input>
            </div>
            <div className="flex justify-center m-3 ">
               <div className="w-60 text-gray-900"> <label className='text-gray-500'>{t("confirmNewPassword")}</label></div>
                <input
                type="password"
                className='w-60 h-10 border p-2'
                name="confirmedNewPassword"
                onChange={(e)=>setconfirmedNewPassword(e.target.value)}
                  >
                </input>
            </div>
           
            <div className='m-4'>
                <button className=' w-52 bg-sky-900 rounded-xl p-3 text-white ' type="submit" onClick={handleSubmit}>{t("mettreajour")} </button>
            </div></div> 
           
          
            </div>
            {message && <Message message={message}/>}
            
            
            
           
        </div>
   
  )
}

export default UpdatePassword