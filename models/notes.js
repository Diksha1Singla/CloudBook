const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
// const { refine } = require("../validator/auth_validator");
const {Schema} = mongoose

const NotesSchema = new Schema({
    user:{                      //like foriegn key can now store user in it 
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type : String,
        required:true
    },
    description:{
        type : String,
        required:true
    },
    tag:{
        type : String,
        default:"General"
    },
    date:{
        type:Date,
        default: Date.now
    }
})
NotesSchema.statics.generateToken = async function(){
    try {
        return jwt.sign({
            userId : this._id
            // email:this.email
        },"poiuytrewqasdfghjklmnbvcxswertyui",{
            expiresIn:"14d"
        })
    } catch (error) {
        console.log(error);
    }
}

const Notes = mongoose.model("note",NotesSchema)
module.exports = Notes