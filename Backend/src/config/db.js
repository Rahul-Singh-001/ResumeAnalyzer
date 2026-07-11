const mongoose =require("mongoose")


function connectDB(){
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Datebase Connected")
    }
    catch(err){
        console.log("Error is: "+ err)
    }
}

module.exports=connectDB