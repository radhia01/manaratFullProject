const client = require("../config/db");
// add like to an existing project 
exports.addLike=async(req,res)=>{
  const {userId,projectId}=req.body;
    try{
      // verify if user has alraedy likes the project 
      const verifiedLike=await client.query("select * from likes where id_user=$1 and id_project=$2",[userId,projectId])
      if(verifiedLike.rows.length>0){
     
       await client.query("delete from likes where id_user=$1 and id_project=$2",[userId,projectId])
       
       return res.status(200).json({deslike:{id:verifiedLike.rows[0].id}})

      }
      else {
        const newLike=await client.query("insert into likes (id_user,id_project) values ($1,$2) returning *",[userId,projectId])
         return res.status(201).json({like:newLike.rows[0]})
      }
      
    }
    catch(error){
      console.log(error.message)
  return res.status(500).json({error: error.message})
    }
}

// get likes 
exports.getProjectLikes=async(req,res)=>{
    try{
        const {id}=req.params;
        const likes=await client.query("select * from likes where id_project =$1",[id]);
        return res.status(200).json(likes.rows)   }
    catch(error){
return res.status(500).json({error:message.error})
    }
}
// gel likes 
exports.getLikes=async(req,res)=>{
    try{
      
        const likes=await client.query("select * from likes ");
        return res.status(200).json(likes.rows)   }
    catch(error){
      return res.status(500).json({error:message.error})
    }
}
// delete all likes
exports.deslike=async(req,res)=>{
  try{
    await client.query("delete   from likes")
    return res.status(200).json({success:true})
  }
  catch(error){
    return res.status(500).json({error:message.error})
  }
}