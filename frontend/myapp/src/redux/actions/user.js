import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios"

// get all users 
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
  
    try {
      const {data} = await axiosInstance.get(`api/users`);
      return data;
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// update user profile
export const updateProfile=createAsyncThunk("user/updateProfile",async(user,thunkAPI)=>{
 
  try{
    const response=await axiosInstance.put(`api/users/${user.id}`,user.data)
    return response.data
  }
  catch(error){
    const message=error.response.data.message;
    return thunkAPI.rejectWithValue(message)

  }
})
// update password 
export const updateUserPassword=createAsyncThunk("user/updatePassword",async(user,thunkAPI)=>{
  try{
     const response=await axiosInstance.patch(`api/update/password/users/${user.id}`,user.data);
     return response.data
  }
  catch(error){
    if(error.response && error.response.data.errorCode){
      const msg=error.response.data.errorCode
      return thunkAPI.rejectWithValue(msg)
    }
  

  }
})
// get user by id 
export const getUserById=createAsyncThunk("user/getUser",async(data,thunkAPI)=>{
  try{
    const response=await axiosInstance.get(`api/users/${data.id}`)
    return response.data
  }
  catch(error){
    if(error.response && error.response.data.errorCode){
      const msg=error.response.data.errorCode
      return thunkAPI.rejectWithValue(msg)
    }
  }
})
// delete user
export const deleteUser=createAsyncThunk("user/deleteUser",async(id,thunkAPI)=>{
  try{
    const response=await axiosInstance.delete(`api/users/${id}`)
    return response.data
  }
  catch(error){
    if(error.response && error.response.data.errorCode){
      const msg=error.response.data.errorCode
      return thunkAPI.rejectWithValue(msg)
    }
  }
})