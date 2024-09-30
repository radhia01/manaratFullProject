import { createSlice } from "@reduxjs/toolkit";
import { addLike, getLikes } from "../actions/like";


const initialState = {
  likes:[]
};
const projectSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    resetMessage(state) {
      state.message = "";
    },
    resetError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
   
     // get likes 
     builder.addCase(getLikes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLikes.fulfilled, (state, action) => {
     state.likes=action.payload
    });
    builder.addCase(getLikes.rejected, (state, action) => {
      state.error = action.payload;
    });
    
     // add like
     builder.addCase(addLike.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addLike.fulfilled, (state, action) => {
   if(action.payload.deslike){
    state.likes=state.likes.filter(element=>element.id!=action.payload.deslike.id)
   }
   else{
    state.likes=[...state.likes,action.payload.like]
   }

    });
    builder.addCase(addLike.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
 

export default projectSlice.reducer;
export const { resetError, resetMessage } = projectSlice.actions;
