const mongoose=require("mongoose");
const bcrypt=require('bcrypt');
const jwtManager = require("../../../managers/jwtManager");

const Login=async(req,res)=>{

  const userModel=mongoose.model('users');
  const{email,password}=req.body;

  if(!email) throw 'Email is Required';
  if(!password) throw 'Password is Required';

  const getUser=await userModel.findOne({
    email:email
  });

  if(!getUser) throw 'Email does not exist in the Database';

  const comparePassword=await bcrypt.compare(password,getUser.password);

  if(!comparePassword) throw 'Email and Password doest not match';

  const accessToken=jwtManager(getUser);

  res.status(200).json({
    status:"Login Successfully",
    email:email,
    Login_User:getUser,
    accessToken:accessToken
  })
}

module.exports=Login;