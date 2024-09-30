const express = require("express");
const { signUp, signIn, updatePassword, logout, refreshTokenMiddleware,verifyEmailAndPassword } = require("../controller/auth");
const router = express.Router();
const verifyPasswordMiddleware=require("../utils/verifyPassword")
// route to sign Up
router.post("/api/signUp", signUp);
router.post("/api/verify/email/password", verifyEmailAndPassword);
// route to signIn
router.post("/api/signIn", signIn);

// route to update password 
router.patch("/api/update/password/users/:id",verifyPasswordMiddleware,updatePassword)
// route to refresh token 
router.get("/api/refresh/token",refreshTokenMiddleware)
// route to  logout 
router.get("/api/logout",logout)
module.exports = router;
