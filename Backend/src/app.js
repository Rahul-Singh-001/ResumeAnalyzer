const express =require("express")
const cors=require("cors")
const app=express()
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
// require all the routes here
const authRouter=require("./routes/auth.route.js")

/* define all the routes prefix */
app.use("/api/auth",authRouter)

module.exports=app