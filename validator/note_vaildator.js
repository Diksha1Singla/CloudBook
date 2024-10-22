const {z} = require("zod")
const notesSchema = z.object({
    // title    description     tag     date
    title:z
    .string({error_message:"title requried"})
    .min(3,{message:"title must be of min 3 characters"})
    .max(256,{message:"title must not exceed 256 characters"}),

    description:z
    .string({error_message:"title requried"}),
    // .min(50,{message:"title must be of min 150 characters"})
    // .max(2056,{message:"title must not exceed 2056 characters"}),

    title:z
    .string()
})

module.exports = notesSchema