const jsonwebtoken = require("jsonwebtoken");

const jwtManager=(user)=>{

  const accessToken=jsonwebtoken.sign({_id:user._id},process.env.SECERET,{expiresIn:'3d'});

  return accessToken;

}

module.exports=jwtManager;