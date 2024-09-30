import React from 'react'
import { sendMessage } from '../../redux/actions/message'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react';
function FormContact() {
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.auth);
    const {users}=useSelector(state=>state.users)
    const [content, setcontent] = useState()
    const id_reciever=users && users.find(user=>user.role==="Admin").id
    const handleSubmit=()=>{
       
        const id_sender=user.id
        const data={id_sender,id_reciever,content}
           dispatch(sendMessage(data))
    }
  return (
    <div className='w-full  justify-center p-10 border  shadow mt-20 '>
    <div className="text-black text-3xl">Contactez-Nous</div>
    <form className='m-6' onSubmit={handleSubmit}> 
       
       <div><textarea cols="15" rows="10"  type='text' placeholder='votre message' className=' m-4shadow border  p-3 rounded  w-1/3 text-gray-700' onChange={e=>setcontent(e.target.value)}></textarea></div> 
       <div className='m-4 '><button className='bg-blue-500 hover:bg-blue-700 w-auto p-3 text-white rounded '>Envoyer</button></div> 
         </form>
  

    </div>
  )
}

export default FormContact