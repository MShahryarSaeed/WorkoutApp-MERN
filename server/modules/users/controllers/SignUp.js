const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator=require('validator');
const jwtManager = require("../../../managers/jwtManager");

const SignUp=async(req,res)=>{
  
  const userModel = mongoose.model("users");
  const{email,password}=req.body;

  const getDuplicateEmail=await userModel.findOne({
    email:email
  });
  
  // Validations
  if(getDuplicateEmail) throw 'Email already in use.Try another one';
  if(!email) throw 'Email is Required';
  if(!validator.isEmail(email)) throw 'Please Input a Valid Email';
  if(!password) throw 'Password is Required';
  if (password.length < 8) throw "Password must b atleast 8 characters";

  // if(!validator.isStrongPassword(password)) throw 'Please Input Strong Password';

  const hashPassword=await bcrypt.hash(password,12);

  const createdUser=await userModel.create({
    email:email,
    password:hashPassword
  })

  const accessToken=jwtManager(createdUser);

  res.status(201).json({
    // status:"SignUp Successfully",
    email : email,
    // NewUser:createdUser,
    accessToken:accessToken
  });



}

module.exports=SignUp;