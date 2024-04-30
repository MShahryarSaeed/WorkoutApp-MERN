const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');


const auth = async (req, res, next) => {

  const userModel = mongoose.model('users'); 

  // Extracting authorization token from request headers
  const { authorization } = req.headers;

  
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    // Extracting access token from authorization header
    const accessToken = authorization.replace("Bearer ", "");

   
    const { _id } = jsonwebtoken.verify(accessToken, process.env.SECERET);

    // Finding user by ID in the database
    req.user = await userModel.findOne({ _id }).select('_id');
   

  } catch (error) {

    console.log("Error :", error); 
  
    res.status(401).json({
      status: "failed",
      message: "unAuthorized"
    });

    return;

  }

  next(); 
}

module.exports = auth; 
