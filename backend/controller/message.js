const client=require("../config/db")
const moment=require("moment")
const {format}=require("date-fns")

// send message
exports.sendMessage=async(req,res)=>{
    const {id_sender,id_reciever,content}=req.body
    const today=format(new Date(), 'MM/dd/yyyy')
    try{
        const message=await client.query("insert into message(id_sender,id_receiver,content,sendat)  values($1,$2,$3,$4) returning *",[id_sender,id_reciever,content,today])
       return res.status(201).json(message.rows[0])
    }
    catch(error){
        console.log(error.message)
    return res.status(500).json({err:error.message})
    }
}
// get all messages 
exports.getMessages=async(req,res)=>{
    try{
        const messages=await client.query("select * from message")
        return res.status(200).json(messages.rows)
    }
    catch(error){
 return res.status(500).json({err:error.message})
    }
}
// get messages by user (send or received by the user with specific id)
exports.getUserMessages=async(req,res)=>{
    const {id}=req.params;
    try{
        const userMessages=await client.query("SELECT * FROM message where id_receiver=$1 or id_sender=$2 ",[id,id])
        return res.status(200).json(userMessages.rows)
    }
    catch(error){
  return res.status(500).json({error:error.message})
    }
}
// get messages between two users
exports.getMessagesByUser=async(req,res)=>{
    const {id_receiver,id_sender}=req.params;
    try{
      const messages=await client.query("SELECT sendat AS message_date, array_agg(content ) AS messages FROM message WHERE(id_receiver = $1 AND id_sender = $2) OR (id_receiver = $2 AND id_sender = $1)GROUP BY message_date ORDER BY message_date; ",[id_receiver,id_sender])   
    return res.status(200).json(messages.rows)}
    catch(error){
   return res.status(500).json({error:error.message})
    }
}
