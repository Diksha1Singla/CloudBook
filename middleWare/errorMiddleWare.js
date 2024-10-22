const errorMiddleWare = (err,req,res,next)=>{
    const status = err.status || 500
    const message = err.status || "BACKEND ERROR"
    const extraDetails = err.extraDetails||"Error from Server Side"
    console.log(err);
    
    return res.status(status).json({message,extraDetails})
}

module.exports=errorMiddleWare