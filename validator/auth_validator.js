const {z} = require("zod");
const signupSchema = z.object({
    username:z
    .string({required_error:"Name Required"})
    .trim()
    .min(3,{message:"Name must be atleast 3 characters"})
    .max(256,{message:"Name must not be more than 256 characters"}),

    email:z
    .string({required_error:"email Required"})
    .trim()
    .email({message:"Invalid email"})
    .min(3,{message:"email must be atleast 3 characters"})
    .max(256,{message:"email must not be more than 256 characters"}),

    phone:z
    .string({required_error:"Phone Number Required"})
    .trim()
    .min(10,{message:"phone number must be of 10 digits"})
    .max(10,{message:"phone number must be of 10 digits"}),

    password:z
    .string({required_error:"Password Required"})
    .min(6,{message:"Password must be atleast 3 characters"})
    .max(256,{message:"Password must not be more than 256 characters"})
})

module.exports = signupSchema