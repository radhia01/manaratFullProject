const jwt=require("jsonwebtoken");
require("dotenv").config()
const verifyUser=(req,res,next)=>{
    const authHeader=req.headers.authorization||req.headers.Authorization
    console.log("auth header"+authHeader)
    if(!authHeader){
        return res.status(401).json({message:" token is failed"})
    }
    const token =authHeader.split(" ")[1]
    console.log("token is"+token)
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return res.status(403).json({message:"unauthorized"})
        }
        req.user=user;
        next();
    })
}
module.exports=verifyUser;