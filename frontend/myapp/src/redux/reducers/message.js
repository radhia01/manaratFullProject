import { createSlice } from "@reduxjs/toolkit";
import { getMessagesByUsers, getUserMessages,sendMessage } from "../actions/message";
const initialState = {
  messages: [],
  userMessages:[],
  error:null,
  loading:true,
  sendSuccess:false
};
const messageSlice = createSlice({
  name: "message",
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
    builder.addCase(getUserMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserMessages.fulfilled, (state, action) => {
      state.loading=false;
      state.messages = action.payload;
    });
    builder.addCase(getUserMessages.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(sendMessage.pending, (state) => {
      state.loading = true;
      state.sendSuccess=false;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.sendSuccess=true;
      state.messages = [...state.messages,action.payload];
      state.userMessages=state.userMessages.map(message=>{
        if(message.message_date===action.payload.sendat){
          message.messages.push(action.payload.content)
        }
        return message
      })
   
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.error = action.payload;
      
    });
    builder.addCase(getMessagesByUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMessagesByUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.userMessages = action.payload;
   
    });
    builder.addCase(getMessagesByUsers.rejected, (state, action) => {
      state.error = action.payload;
    });
    
  },
});

export default messageSlice.reducer;
export const { resetError, resetMessage } = messageSlice.actions;
