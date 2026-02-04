import jwt from "jsonwebtoken"
export function verifyToken(req,res,next){
 //token verification

 // Get token from req(using cookie-parser)
  let signedToken= req.cookies.token //{token: ""}
  if(!signedToken){
    return res.status(401).json({messsage:"please login"});
  }

  // Verify token
  let decodedToken = jwt.verify(signedToken,'abcdef') 
  next();
}