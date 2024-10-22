const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const userScheme = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})
// hashing
// const user = this ;       // current object
userScheme.pre("save",async function(next){
    try {
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password,10)
        }
        next()
    } catch (error) {
        next(error)
    }
})

userScheme.methods.comaprePassword =async function(password){
    return bcrypt.compare(password,this.password)
}

// web token always on client side never on server side
userScheme.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },"kujyfhtrsdtfyguhijoijhugjfddxfcghjkhgfdghgjhkljhghfggfhgjhkjlklhjkghjgh",{
            expiresIn:"30d"
        })
    } catch (error) {
        console.log(error);
        
    }
}

const User = new mongoose.model("Userschema",userScheme);
module.exports = User

