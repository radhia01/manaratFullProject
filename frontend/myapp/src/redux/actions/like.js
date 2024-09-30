import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios"



// get likes 
export const getLikes = createAsyncThunk(
  "likes/getLikes",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("api/likes");
      return response.data;
    } catch (error) {
      const message = error.response.data.error;
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//  add like  to a project 
export const addLike = createAsyncThunk(
  "likes/addLike",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/likes`,data.userData, 
        
      );
      
      return response.data;
    } catch (error) {
      const status=error.response.status;
      if(status===401 || status===404){
        
      }
      const message = error.response?.data?.error 
      return thunkAPI.rejectWithValue(message);
    }
  }
);