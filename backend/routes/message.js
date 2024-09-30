const express=require("express")
const { sendMessage, getMessages, getUserMessages, getMessagesByUser } = require("../controller/message")
const verifyUser = require("../utils/verifyUser")
const router=express.Router()
// send new message
router.post("/api/messages",verifyUser,sendMessage)
// get all messages 
router.get("/api/messages",getMessages)
// get user messages 
router.get("/api/messages/users/:id",verifyUser,getUserMessages)
//route to get messages between two users
router.get("/api/messages/:id_receiver/:id_sender",verifyUser,getMessagesByUser)
module.exports=router