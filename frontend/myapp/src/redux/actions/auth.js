import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios"


export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/api/signUp",
        user,
      );
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      console.log(message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// verify password
export const verifyEmailAndPassword = createAsyncThunk(
  "auth/verifyPassword",
  async (user, thunkAPI) => {
    try {

      const password = user.password;
      const email = user.email;
      const response = await axiosInstance.post(
        "api/verify/email/password",
        { password, email }
      );
  
      return response.data;
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// signIn
export const signIn = createAsyncThunk(
  "auth/signin",
  async (user, thunkAPI) => {
   
    try {
      const response = await axiosInstance.post(
        "/api/signIn",
        user,
        {
          withCredentials:true,
          
        }
      );
   
      return response.data;
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// signOut 
export const signOut=createAsyncThunk("auth/signOut",async(_,thunkAPI)=>{
  try{
    const response=await axiosInstance.post("api/logout",
    {
      withCredentials: true,
    })
    return response.data
  }
  catch(error){


  }
})
// refresh Token
export const refreshToken=createAsyncThunk("auth/refreshToken",async(_,thunkAPI)=>{
  try{
    const response = await axiosInstance.get("api/refresh/token",{withCredentials:true});

    return response.data
  }
  catch(error){
   const message=error.response.data.message;
   return thunkAPI.rejectWithValue(message)
  }
})
// logout
export const logout=createAsyncThunk("auth/logout",async(_,thunkAPI)=>{
  try{
    const response=await axiosInstance.get("api/logout")
    localStorage.clear();
    return response.data;
  }
  catch(error){
    const message=error.response.data.message;
    return thunkAPI.rejectWithValue(message)
  }
})
// update user image profile
export const updateUserProfileImage=createAsyncThunk("user/updateImageProfile",async(data,thunkAPI)=>{
    console.log(data)
  try{

     return data
  }
  catch(error){
    if(error.response && error.response.data.errorCode){
      const msg=error.response.data.errorCode
      return thunkAPI.rejectWithValue(msg)
    }
  }
})
