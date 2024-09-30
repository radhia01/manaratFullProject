import React from 'react'
import { getUserMessages } from '../../redux/actions/message'
import { useDispatch ,useSelector} from 'react-redux'
import { useEffect ,useState} from 'react'
import { getUsers } from '../../redux/actions/user'
import { useTranslation } from 'react-i18next'
import { sendMessage } from '../../redux/actions/message'  
import { useNavigate } from 'react-router-dom'
import { getMessagesByUsers } from '../../redux/actions/message'
function Messages() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {t}=useTranslation()
  const [message, setmessage] = useState("")
  const {messages,userMessages}=useSelector(state=>state.message)
  const {user}=useSelector(state=>state.auth)
 
  const {users}=useSelector(state=>state.user)
  const [data, setdata] = useState([])
  const [userId, setuserId] = useState()
  const [filter, setfilter] = useState("")
  const [receiver, setreceiver] = useState(null)
  const getLastUser=()=>{
    const newMessages=messages && [...messages].reverse()
   const iduser= newMessages && newMessages[0].id_receiver 
   setreceiver(iduser)
  }  
    useEffect(() => {
     
    dispatch(getUserMessages({id:user.id}))
   
    dispatch(getUsers())

    }, [dispatch])
    useEffect(() => {
      const getLastUser=()=>{
        const newMessages=messages && [...messages].reverse()
        console.log(newMessages)
       const iduser= newMessages.length>0 ? newMessages[0].id_receiver :null
       setreceiver(iduser)
      } 
      getLastUser()
      dispatch(getMessagesByUsers({receiver,sender:user.id}))
    }, [dispatch,messages])
    
    const usersList=()=>{
      const userrs=[]
      const newMessages= messages && [...messages].reverse();
    newMessages && newMessages.map(element=>{
        if(element.id_sender===user.id){
       userrs.push(element.id_receiver)
        }
        else{
          userrs.push(element.id_sender)
        }
        return userrs;
      })
      const uniqueValues=new Set(userrs)
      const filteredArray=[...uniqueValues]
       setdata(filteredArray)
       setuserId(filteredArray[0])
    }
           
    const getUserName=(id)=>{
        const user= users && users.find(element=>element.id===id)
         return user ? `${user.firstname} ${user.lastname}` : "";
    }

    useEffect(() => {
     usersList()
    }, [messages])

  const  handleSubmit=(e)=>{
    e.preventDefault()
    try{
       const data={
         id_sender:user.id,id_reciever:userId,content:message
      }
      dispatch(sendMessage({data}))
      setmessage("")
        }
        catch(error){
          console.log(error)
        }
       }


    const handleUserMessages=(id)=>{
      setuserId(id)
     dispatch(getMessagesByUsers({receiver:user.id,sender:id}))
    }
     
  return (
    <div style={{height:"100vh"}} >
      

      <div  style={{height:"100vh"}}>
       <div className='grid grid-cols-3  p-10 '>
        <div className='flex justify-center  items-end'>
          <input type="text" className='bg-gray-100 border text-sm  w-80 border-gray-300 rounded-md p-3' placeholder={t("searchUser")} onChange={e=>setfilter(e.target.value)}/>
        </div>
        <div className="text-3xl mt-7 lemon-regular col-span-2  ">{t("boiteReception")} </div>
        
        </div> 
        <div class="  grid grid-cols-3   m-2"  style={{height:"70vh"}}> 
        <div className='  max-h-[480px] overflow-y-auto'>
    
          {data && data.filter(user=>getUserName(user).toLocaleUpperCase().includes(filter.toUpperCase())).map(element=>{
            return (
               <button  type="button"  key={element} className='  bg-blue-400 text-black m-6  w-64 h-10   text-sm rounded font-bold ' onClick={()=>handleUserMessages(element)} >

              {getUserName(element)}
           </button>
            
            )
          
          })}
        </div>
        {/* part2 */}
        <div className='px-5 col-span-2 grid-rows-3 h-full relative '>
          <div className='grid-rows-3 row-span-1 text-1xl border p-4 flex justify-start text-white bg-gray-800 ' >{userId ? getUserName(userId) :""}</div>
           <div className='m-2 max-h-[350px] overflow-y-auto  p-2 '>   
          
{userMessages && userMessages.length>0 ? userMessages.map(element=>{
  return (
    <>
    <div className='text-gray-500' key={element.message_date}>{element.message_date}</div>
    
   {element.messages && element.messages.map(msg=>{
    return(
      <div 
      key={msg.id}
      className="border flex justify-start p-1 text-lg row m-2 shadow"
      style={{ width: `${msg.length * 20}px` }}
    >

      {msg}
    </div>
    )
      
   })}
    </>
  )
}):"Votre boite est vide"}
          </div>
          <div class="flex left-0 absolute bottom-2 w-full">
          <input type="text" className='  h-14  mr-2  w-3/4' placeholder={t("addMessage")}  value={message} onChange={(e)=>setmessage(e.target.value)}  />
    <button className=' w-36 h-8 rounded  bg-blue-400 text-black font-bold mt-6'   onClick={handleSubmit}>{t("send")}</button>
          </div>
        </div>
        </div></div>    
    </div>
  )
}
export default Messages