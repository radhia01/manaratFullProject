import { createSlice } from "@reduxjs/toolkit";
import { logout, refreshToken, signIn, signUp, updateUserProfileImage, verifyEmailAndPassword } from "../actions/auth";
import { updateUserPassword,updateProfile } from "../actions/user";
const initialState = {
  token: null,
  loading: false,
  users: [],
  user:  null,
  error: null,
  message: null,
  successRegister: false,
  successLogin: false,
  successVerifyPassword: false,
  successLogout:false
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMessage(state) {
      state.message = null;
    },
    resetError(state) {
      state.error = null;
    },
    setCredentials:(state,action)=>{
      const{user,token}=action.payload
      state.user=user;
      state.token=token
    }
  

  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.users = [...state.users, action.payload.user];
      state.successRegister = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(verifyEmailAndPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyEmailAndPassword.fulfilled, (state, action) => {
      state.successVerifyPassword = true;
    });
    builder.addCase(verifyEmailAndPassword.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.token=action.payload.token;
      state.user=action.payload.user;
      state.successLogin=true
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateUserPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.users = state.users.map(user=>user.id===action.payload.id?action.payload:user);
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
    state.user=action.payload
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.error = action.payload;
    });
    
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading=false;
     state.token=action.payload.accessToken
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(logout.pending,(state)=>{
      state.loading=true;
    
    });
    builder.addCase(logout.fulfilled,(state,action)=>{
      state.loading=false;
      state.user=null   
  
    })
    builder.addCase(logout.rejected,(state,action)=>{
      state.error=action.payload;
    });
    builder.addCase(updateUserProfileImage.pending,(state)=>{
      state.loading=true
    });
    builder.addCase(updateUserProfileImage.fulfilled,(state,action)=>{
      state.user = {
        ...state.user, 
        profile_img: action.payload, 
      };
    });
    builder.addCase(updateUserProfileImage.rejected,(state,action)=>{
      state.error=action.payload
    })
   
  },
});

export default authSlice.reducer;
export const { resetError, resetMessage,setCredentials } = authSlice.actions;