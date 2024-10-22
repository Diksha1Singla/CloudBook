const validate = (schema) => async(req,res,next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body)
        // req.body = parseBody
        next()
        
    } catch (err) {
        // res.status(400).json({msg:error.errors[0].message});
        // console.log(error.errors[0].message);

        const status = 422;
        const message = "Fill Details"
        const extraDetails = err.errors[0].message;
        console.log("err: ",err);

        const error = {
            status,message,extraDetails
        }
        console.log(error)
    }
}

module.exports = validate