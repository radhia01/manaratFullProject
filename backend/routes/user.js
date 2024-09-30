const express = require("express");
const client = require("../config/db");
const { getAllUsers, getUserById, updateProfile, deleteUser } = require("../controller/user");
const verifyUser=require("../utils/verifyUser")
const cloudinary=require("cloudinary").v2;
const multer=require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Role={
  Admin:"Admin",
  User:"User"
}
const authRole=require("../utils/role");
const { deleteAccount } = require("../controller/auth");
// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }
 
const router = express.Router();
// route to get all users
router.get("/api/users",getAllUsers);
//  route to get user by id
router.get("/api/users/:id", verifyUser,getUserById);
// routr to update user  profile 
router.put("/api/users/:id",verifyUser,updateProfile)
// route to update user image 
router.post("/api/users/upload/image/:id",upload.single("file"),async(req,res)=>{
    const { id } = req.params;

    try{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    await client.query("update users set profile_img=$1 ",[cldRes.secure_url])
      const user=await client.query("select * from users where id=$1",[id])
      console.log(user)
      return res.status(200).json(user.rows[0])
    
    }
   catch(error){
    return  res.status(500).json({error:error.message})
}}
);
// delete user  
router.delete("/api/users/:id",deleteUser)
// delete user account 
router.delete("/api/users/account",verifyUser,deleteAccount)
module.exports = router;
