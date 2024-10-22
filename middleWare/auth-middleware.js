const jwt = require("jsonwebtoken")
const user = require("../models/userModel")

/*
middle ware extra parameter next()
if next()called only then will move to root function
*/

const authMiddleWare=async(req,res,next)=>{
    const token = req.header("Authorization")
    if(!token){
        return res.status(401).json({message:"Unauthorized token"})
    }

    const jwtToken = token.replace("Bearer","").trim();
    console.log("token:",jwtToken)
    
    try {
        const isVerified = jwt.verify(jwtToken,"kujyfhtrsdtfyguhijoijhugjfddxfcghjkhgfdghgjhkljhghfggfhgjhkjlklhjkghjgh")
        console.log(isVerified);
        const userData = await user.findOne({email:isVerified.email})
        select({password:0})
        // custom properties
        req.user=userData,
        req.token=token,
        req.userId=userData._id
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports=authMiddleWare