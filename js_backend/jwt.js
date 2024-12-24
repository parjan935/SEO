const jwt = require('jsonwebtoken');
require('dotenv').config();
//jwt middleware for authorization
const jwtMiddleware = (req,res,next)=>{
    const header = req.headers.authorization;
    if(!header)return res.status(401).json({error:"Token not found"})
    const token = header.split(' ')[1];
    if(!token)res.status(401).json({error:"unauthorized"});

    try {
        //jwt token verification
        const response = jwt.verify(token,process.env.JWT_KEY);
        // console.log(response)
        req.user = response;
        next();
    } catch (err) {
        console.log("Error");
        res.status(401).json({error:"unauthorized"});
    }
};
//generating the token
const gToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_KEY);
    // return jwt.sign(userData,process.env.JWT_KEY,{expiresIn:"2h"});
}
module.exports= {jwtMiddleware,gToken};
