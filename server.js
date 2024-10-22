const express = require("express")
const app = express()
const cors = require("cors");
const port = process.env.port || 2000
const router = require("./router/auth_router");
const errorMiddleWare = require("./middleWare/errorMiddleWare")
const adminRoute = require("./router/adminRouter")
const noteroute = require("./router/note_route")

require("./utils/db")
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET,POST,DELET,PUT,PATCH,HEAD"
    // credentials:true,
}
app.options('/notes/deleteNotes/:id', cors());
// app.options('/notes/addNotes', cors());


app.use(cors(corsOptions))
app.use(express.json());
app.use(errorMiddleWare)
app.use(router);
app.use("/api/admin",adminRoute)
app.use("/notes",noteroute)

app.listen(port,()=>{
    console.log(`Listening to the Port : ${port}`)
})