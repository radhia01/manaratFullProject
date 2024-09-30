import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios"

// get projects by user
export const getProjectsByUser = createAsyncThunk(
  "project/getProjectsByUser",
  async (data, thunkAPI) => {

    try {
      const response = await axiosInstance.get(
        `api/projects/users/${data.id}`,
        
      );
      return response.data;
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get all projects
export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("api/projects");
      return response.data;
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete project 
export const deleteProject=createAsyncThunk("project/deleteProject",async(data,thunkAPI)=>{
       try{
         const response=await axiosInstance.delete(`api/projects/${data.id}`)
  return response.data
       }
       catch(error){
   const message=error.response.data.error
   return thunkAPI.rejectWithValue(message)
       }
})

export const acceptProject=createAsyncThunk("project/acceptProject",async(id,thunkAPI)=>{

  try{
    const response=await axiosInstance.put(`api/projects/accept/${id}`)
return response.data
  }
  catch(error){
const message=error.response.data.error
return thunkAPI.rejectWithValue(message)
  }
})
