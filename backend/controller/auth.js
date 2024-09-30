const client = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()
//  verify password middleware

const verifyEmailAndPassword = async (req, res) => {
  try {
    const {password} = req.body;
    const {email}=req.body
    console.log(email)
    const existingUser=await client.query(
      "SELECT * FROM USERS WHERE EMAIL=$1",
      [email]
    );
    console.log(existingUser)
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "User  already exist  " });
    }
    if (password.length < 8) {
      return res.status(400).json({
        error: "MUST_8_CARACTERS",
      });
    } else if (password.includes(email)) {
      return res.status(400).json({
        error: "MUST_NOT_CONTENT_EMAIL",
      });
    } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      return res.status(400).json({
        error:
          "MUST_CONTENT_LOWER_AND_LOWER",
      });
    } else if (!/[0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\-]/.test(password)) {
      return res.status(400).json({
        error: "MUST_CONTENT_SPECIFIC_CARACTERS",
      });
    }
       return res.status(200).json({message:"well"})
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const signUp = async (req, res) => {
  try {
   
    const imageProfile =
      "https://res.cloudinary.com/db8b6npfz/image/upload/v1700921258/user_bgjn60.png";
    const { firstName, lastName, email, password, adress, phone, job } =
      req.body;
     
      
    
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const user = await client.query(
      "INSERT INTO USERS(firstName, lastName, email, password, adress, phone, job,profile_img,user_role)values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        lastName,
        firstName,
        email,
        hashedPassword,
        adress,
        phone,
        job,
        imageProfile,
        "User"
      ]
    );

    // return result
    return res.status(201).json({ user: user.rows[0] ,success:true});
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: error.message});
  }
};
// signIn
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    /// check if user already exist in the database
    const existingUser = await client.query(
      "SELECT * FROM USERS WHERE EMAIL=$1 ",
      [email]
    );
    console.log(existingUser)
    if (existingUser.rows.length === 0) {
     
      return res.status(404).json({ error: "user not found" });
    }
    // compare passwords

    const comparedPasswords = await bcrypt.compare(
      password,
      existingUser.rows[0].password
    );
    if (!comparedPasswords) {
      return res.status(404).json({ error: "password incorrect" });
    }

    // generate  access token
    const token = jwt.sign({ id: existingUser.rows[0].id ,role:existingUser.rows[0].user_role}, process.env.JWT,{expiresIn:"2m"});
    // generate refresh token 
    const refreshToken=jwt.sign({ id: existingUser.rows[0].id ,role:existingUser.rows[0].user_role},process.env.REFRESH_TOKEN,{expiresIn:"1d"})
    return res.cookie("refreshToken",refreshToken,{
      httpOnly: true,
      secure:true,
      sameSite:'none',
      maxAge:7*24*60*60*1000
    }).json({ token, user: existingUser.rows[0], success: true });
   
  } catch (error) {
  
    return res.status(200).json({ error:error.message });
  }
};
// update password 
const updatePassword=async(req,res)=>{
  try{
    const {id}=req.params
    const {lastPassword,newPassword,confirmedNewPassword}=req.body
    // verify if user already exist 
    const existingUser = await client.query(
      "SELECT * FROM USERS WHERE id=$1 ",
      [id]
    );
    if(!existingUser.rows[0]){
      return res.status(404).json({error:"USER_Not_Found"})
    }
    // verify lastpassword
    const verifyPassword=await bcrypt.compare(lastPassword,existingUser.rows[0].password)
    if(!verifyPassword){
      return res.status(400).json({error:"Invalid_Password"})
    }
    // verify if new passwords matches 
if(newPassword!==confirmedNewPassword){
  return res.status(400).json({error:"Passwords_not_matches"})
}
    const newUserPassword=await bcrypt.hash(newPassword,10);
    console.log(newPassword,newUserPassword)
    const newUser=await client.query("update users set password=$1 where id=$2 returning *",[newUserPassword,id])
    return res.status(200).json(newUser.rows[0])
  }
  catch(error){
  return res.status(500).json({error:error.message})
  }
}
// refresh token
const refreshTokenMiddleware=async(req,res,next)=>{
  const authData=req.cookies.refreshToken
  console.log("cookie",req.cookies)
  if(!authData){
    return res.status(401).json({error:"unauthorized"})
  }
    jwt.verify(authData,process.env.REFRESH_TOKEN,async(err,decode)=>{
      if(err){
        return res.status(403).json({error:"access token error"})
        
      }
      const foundUser=await client.query("select * from users where id=$1",[decode.id])
      if(!foundUser.rows[0]){
        return res.status(401).json({error:"unauthorized"})
      }
      const accessToken=jwt.sign({ id: foundUser.rows[0].id ,role:foundUser.rows[0].user_role},process.env.JWT,{expiresIn:"4m"})
      res.status(200).json({accessToken})
    })

  
 
}
// logout
const logout=(req,res)=>{
  res.clearCookie("refreshToken",{httpOnly:true})
  res.status(200).json({message:"cookie cleared",success:true})
}
// delete account 
const deleteAccount=async(req,res)=>{
  const {id}=req.user
  try{
      await client.query("delete from likes where id_user=$1",[id]);
      await client.query("delete from projects where id_user=$1",[id])
      await  client.query("delete from users where id=$1",[id])

  }
  catch(error){

  }
}
module.exports = { signUp, signIn ,updatePassword,refreshTokenMiddleware,logout,deleteAccount,verifyEmailAndPassword};
