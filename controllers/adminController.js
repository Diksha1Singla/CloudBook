const User = require("../models/userModel")
// const contact = require("../models/contact-model");
const getAllUsers = async(req,res)=>{
    try {
        const usersData = await User.find({},{password:0});
        if(!usersData || usersData.length===0){
            res.status(404).send({message:"No users found"})
        }
        return res.status(404).json(usersData)
    } catch (error) {
        console.log(error);
    }
}

// const getAllContact=async(req,res)=>{
//     try {
//         const contactData = await contact.find();
//         if(!contactData || contactData.length===0){
//             res.status(404).send({message:"No contact found"})
//         }
//         return res.status(200).json(contactData)
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports = {getAllUsers};