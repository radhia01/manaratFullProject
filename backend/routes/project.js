const express = require("express");
const {
  createProject,
  getAllProjects,
  getProject,
  getAllProjectsByUser,
  updateProject,
  deleteProject,
  acceptProject,
} = require("../controller/project");
const roleAuth =require("../utils/role");
const verifyUser=require("../utils/verifyUser")
const router = express.Router();
// route to create new project
router.post("/api/projects/users/:id",verifyUser, createProject);
// route to get all projects
router.get("/api/projects",getAllProjects);
// get project by id
router.get("/api/projects/:id",verifyUser, getProject);
// route to get all projects by user    
router.get("/api/projects/users/:id", verifyUser,getAllProjectsByUser);
// route to update project
router.patch("/api/projects/:id", verifyUser,updateProject);
// route to delete project
router.delete("/api/projects/:id",verifyUser, deleteProject);
// approuve project 
router.put("/api/projects/accept/:id",verifyUser,roleAuth("Admin"),acceptProject)
module.exports = router;
