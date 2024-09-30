const express = require("express");
const { addLike, getProjectLikes, getLikes, deslike } = require("../controller/likes");
const verifyUser=require("../utils/verifyUser")
const router = express.Router();
// route to  add new like 
router.post("/api/likes",verifyUser,addLike)
// get project likes 
router.get("/api/likes/project/:id",verifyUser,getProjectLikes)
// get all likes 
router.get("/api/likes",verifyUser,getLikes)
// delete all likes 
router.get("/api/deslike",verifyUser,deslike)
module.exports = router;
