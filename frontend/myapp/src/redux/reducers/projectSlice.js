import { createSlice } from "@reduxjs/toolkit";
import {
  addProject,
  getAllProjects,
  getProjectsByUser,
  deleteProject,
  getLikesFromProject,
  acceptProject
} from "../actions/project";

const initialState = {
  projects: [],
  message: null,
  userProjects: [],
  likes:[]
};
const projectSlice = createSlice({
  name: "project",
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
    // builder.addCase(addProject.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(addProject.fulfilled, (state, action) => {
    //   state.projects = [...state.projects, action.payload.project];
    //   state.message = action.payload.message;
    // });
    // builder.addCase(addProject.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
    builder.addCase(getProjectsByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProjectsByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userProjects = action.payload;
    });
    builder.addCase(getProjectsByUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(getAllProjects.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(acceptProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(acceptProject.fulfilled, (state, action) => {
      state.loading = false;
      state.projects=state.projects.map(project=>{

        if(project.projectid===action.payload.id){
          project.approved=true

        }
        return project
      })
      
    });
    builder.addCase(acceptProject.rejected, (state, action) => {
      state.error = action.payload;
    });
    // delete project 
    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      console.log(action.payload)
      state.projects = state.projects.filter(project=>project.projectid!==action.payload.idProject);
      state.userProjects=state.userProjects.filter(project=>project.project_id!==action.payload.idProject)
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default projectSlice.reducer;
export const { resetError, resetMessage } = projectSlice.actions;
