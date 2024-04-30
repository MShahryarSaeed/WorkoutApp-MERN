const express=require("express");
const SignUp = require("./controllers/SignUp");
const Login = require("./controllers/Login");


const userRoutes=express.Router();
// UserRoutes
userRoutes.post('/signup',SignUp);
userRoutes.post('/login',Login);

module.exports=userRoutes;