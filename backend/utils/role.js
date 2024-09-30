 const authRole=(userRole)=>{
    return (req,res,next)=>{
        if(req.user.role!==userRole){
            return res.status(401).json({message:"unauthorized"})
        }
        next()
    }
}
module.exports=authRole