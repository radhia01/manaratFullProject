import React from 'react'
 import { getUserById } from '../../redux/actions/user'
 import { useDispatch, useSelector } from 'react-redux'
 import { useEffect ,useState} from 'react'
 import { useTranslation } from 'react-i18next';
 import Message from '../../components/Message/Message';
 import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../../redux/actions/message';
import { Link } from 'react-router-dom';
function Contact({idUser,setshowContactModel}) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const langue=localStorage.getItem("lan")
  const [content, setcontent] = useState("")
  const [message, setmessage] = useState("")
  const {user,token} = useSelector(state=>state.auth)
  const {sendSuccess}=useSelector(state=>state.message)
  const user2=useSelector(state=> idUser ? state.user.users.find(element=>element.id===idUser):null)
  const {t}=useTranslation()
  useEffect(() => {
     dispatch(getUserById({id:idUser}))
  }, [dispatch])
  
     const closeModal=()=>{
      setshowContactModel(false)
     }
     
     const handleSubmit=async()=>{
      setmessage("")
      const data={id_sender:user.id,id_reciever:idUser,content}
      const message={data}
     dispatch(sendMessage(message));
     if(sendSuccess){
      setmessage(t("sendMessageSuccess"))
     }
     }
     useEffect(() => {
       if(langue==="ar"){
     window.document.dir="rtl"
       }
       else 
       window.document.dir="ltr"
     }, [langue])
  return (
    <div className='   z-50  w-2/4  m-auto  h-3/4 bg-white top-10 mx-auto  rounded  shadow-sm'>
   
        <div className=" relative flex text-xl p-4"> <h1> <span className='font-bold'>{(t("SendMessage"))}</span> {user2&& user2.firstname}</h1>
        <Link to="/messages" className='absolute right-2 text-sm'>{t("GoBox")}</Link></div>
        <hr></hr>
        <div className='mt-10 '> 
          <textarea rows="15" cols="60" onChange={e=>setcontent(e.target.value)}   placeholder='votre message' className='border-2 '></textarea>
          <div className=' flex justify-center'>
          <button className='   m-2 bg-cyan-600 p-2 rounded  h-10 font-bold text-gray-900' onClick={handleSubmit}>{t("send")}</button>
          <button className='  m-2 bg-cyan-600 p-2 rounded  h-10 font-bold text-gray-900' onClick={closeModal}>{t("close")}</button></div></div>
      
      {message && <Message message={message}/>}
    </div>
  )
}

export default Contact