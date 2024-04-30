const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');

const auth = async (req, res, next) => {
  // console.log("Auth :", req.headers);
  const userModel = mongoose.model('users');

    // verify user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({error: 'Authorization token required'})
    }
  

  try {

    const accessToken = authorization.replace("Bearer ", "");  //Get only token
    // console.log(accessToken);

    const { _id } = jsonwebtoken.verify(accessToken, process.env.SECERET);
    
    // This will accessable in all places in backend for Example : AddNewWorkout.js
    req.user = await userModel.findOne({  _id }).select('_id');
    console.log("ID:",req.user);

  } catch (error) {
    console.log("Error :",error);
    res.status(401).json({
      status: "failed",
      message: "unAuthorized"
    });

    return;

  }

  next();

}

module.exports = auth;