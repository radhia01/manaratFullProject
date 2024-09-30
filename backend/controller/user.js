const client = require("../config/db");

// get all users
const getAllUsers = async (req, res) => {
  
  try {
    const users = await client.query("select * from users");
    return res.status(200).json(users.rows);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Server error" });
  }
};
// get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await client.query("select * from users where id=$1", [id]);
    return res.status(200).json(user.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message});
  }
};
// update user profile
const updateProfile=async(req,res)=>{
  const {id}=req.params;
  const {firstname,lastname,email,adress,phone,job}=req.body;
  try{   
   await client.query("update users set  firstName=$1,lastName=$2,email=$3,adress=$4,phone=$5,job=$6 where id=$7",[
      firstname,lastname,email,phone,adress,job,id
    ])
    const  updatedUser=await client.query("select * from users where id=$1",[id])
    return res.status(200).json(updatedUser.rows[0])
  }
  catch(error){
    return res.status(500).json({ error: error.message });
  }
}
// delete user
 const deleteUser=async(req,res)=>{
  const {id}=req.params;
 
  try{   
   await client.query("delete from  users where id=$1",[
      id
    ])
    
    return res.status(200).json(id)
  }
  catch(error){
    return res.status(500).json({ error: error.message });
  }
}



module.exports = { getAllUsers, getUserById,updateProfile ,deleteUser};
