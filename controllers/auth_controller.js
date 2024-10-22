const user = require("../models/userModel")
const bcrypt = require("bcrypt")
const home = async(req,res)=>{
    try {
        res.status(200).send("Welcome to home Page!!")
    } catch (error) {
        console.log(error);
        res.status(400).send("Page not found!!")
        console.log("Page not found");
    }
}

const register = async(req,res)=>{
    try {
        const {username,email,phone,password} = req.body
        const userExist = await user.findOne({email})
        if(userExist){
            return res.status(400).json({message : "Account Exists"})
        }
        // const hash_password = await bcrypt.hash(password,10)         :hashing M1
        const createdData = await user.create({username,email,phone,password})
        res.status(200).json({
            createdData,
            token:await createdData.generateToken(),
            userId : createdData._id.toString()
        })
    } catch (error) {
        console.log(error);
        res.status(510).json("Page not found from controoler!!")
        console.log(error)
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const userExist = await user.findOne({email})
        if(!userExist){
            return res.status(400).json({Error:"Inavlid login details1"})
        }
        // const IsValiduser = await bcrypt.compare(password,userExist.password)    M1
        const IsValiduser = await userExist.comaprePassword(password);
        if(IsValiduser){
            res.status(200).json({
                
                token:await userExist.generateToken(),
                userId : userExist._id.toString()
            })
        }
        else{
            return res.status(400).json({Error:"Inavlid login details2"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Page not found!!")
    }
}

const fetchUser = async(req,res)=>{
    try {
        const userData = req.user
        res.status(200).json({userData})
    } catch (error) {
        console.log(error);
        
    }
}


module.exports={home,register,login,fetchUser}