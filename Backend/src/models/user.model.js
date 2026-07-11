const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already Exists"],
        required:true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Account already exists with this email"],
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
        ]
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

const userModel=mongoose.model("user",userSchema);

module.exports=userModel