
const jwt = require("jsonwebtoken")
// const SECRECT_KEY = process.env.SECRECT_KEY

const fetchforUser = async(req,res) => {
    const tokenId = req.header("AuthToken")
        if(!tokenId){
            return res.status(400).json({error:"Please Enter valid authentication1"})
        }
        try {
            const decoded = jwt.verify(tokenId,"poiuytrewqasdfghjklmnbvcxswertyui")
            console.log("decoded:",decoded);
            
            req.user = decoded;
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({error:"Please Enter valid authentication2"})
        }
        console.log("req.user",req.user);
}

module.exports = fetchforUser;