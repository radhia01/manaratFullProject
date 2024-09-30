import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUserById, getUsers, updateProfile } from "../actions/user";
const initialState = {
  users: [],
  loading: false,
  error: null,
  user:null
};
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user=action.payload
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getUserById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.user = action.payload
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users=state.users.filter(user=>user.id!==action.payload.id)
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export default userSlice.reducer;
