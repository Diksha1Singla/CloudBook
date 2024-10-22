// require('dotenv').config();
const jwt = require("jsonwebtoken")
// const SECRECT_KEY = process.env.SECRECT_KEY
const Notes = require("../models/notes")

const addnotes = async(req,res)=>{
    try {
        const createdNote = await Notes.create(req.body);
        const token = await Notes.generateToken()
        res.status(202).json({
            createdNote,
            token,
            userId:Notes._id
        })
    } catch (error) {
        console.log("error in note-controller : ",error)
    }
}

const updateNote = async(req,res)=>{
    const user = req.body
    const newNote = {};
    if(user.title){newNote.title = user.title}
    if(user.description){newNote.description = user.description}
    if(user.tag){newNote.tag = user.tag}

    let note =await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }
    // console.log("note = ",note);
    // console.log("req=",req)
    // console.log("note._id",note._id.toHexString());
    // console.log("req._id",req.params.id);
    
    if(note._id.toHexString()!==req.params.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
}

const DeleteNote = async(req,res)=>{
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not Found")
        }
        if(note._id.toHexString()!==req.params.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({note})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

const fetchUser = async(req,res)=>{
    try {
        const tokenId = req.header("AuthToken")
        if(!tokenId){
            return res.status(400).json({error:"Please Enter valid authentication1"})
        }
        try {
            const decoded = jwt.verify(tokenId,"poiuytrewqasdfghjklmnbvcxswertyui")
            // console.log("decoded:",decoded);
            
            req.user = decoded;
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({error:"Please Enter valid authentication2"})
        }
        // console.log("req.user",req.user);
        
        const notes = await Notes.find({user:req.user.id})
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
    
}
module.exports={fetchUser,addnotes,updateNote,DeleteNote}