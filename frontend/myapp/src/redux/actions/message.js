import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios"
  
// get user's messages 
export const  getUserMessages=createAsyncThunk("message/getUserMessage",async({id},thunkAPI)=>{
    try{
        const response=await axiosInstance.get(`api/messages/users/${id}`,{
           
        })
   
        return response.data
    }
    catch(error){
if(error && error.response.data.error)
{
    const message=error.response.data.error
    return thunkAPI.rejectWithValue(message)
}}
})
// send message 
export const  sendMessage=createAsyncThunk("message/sendMessage",async({ data },thunkAPI)=>{
    try{
        const response=await axiosInstance.post(`api/messages`,data)
       
          
        return response.data
        
     
        
    }
    catch(error){
        if(error.response && error.response.data){
        const message=error.response.data.error
        return thunkAPI.rejectWithValue(message)
          }
    }
})
// get messages by users 
export const getMessagesByUsers=createAsyncThunk("messages/getmessagesByUsers",async({receiver,sender},thunkAPI)=>{
    try{
        const response=await axiosInstance.get(`api/messages/${receiver}/${sender}`,
            
        )
         
        return response.data
    }
    catch(error){
      if(error.response && error.response.data){
        const message=error.response.data.error
        return thunkAPI.rejectWithValue(message)
      }
    }
})