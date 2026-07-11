const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const blacklistTokenModel=require("../models/blacklist.model")
/**
 * @name registerUserController
 * @description register a new user,expects email,username and password in the request body
 * @access Public
 */

async function registerUserController(req,res){
    try {
 
    const {username,email,password}=req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    const isUserAlreadyExists=await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserAlreadyExists){
        if(isUserAlreadyExists.username===username){
            return res.status(400).json({
                message:"Account already exists with this username"
            })
        }
        else{
            return res.status(400).json({
                message:"Account already exists with this email address"
            }) 
        }
    }

    const hash=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,
        email,
        password:hash
    })
    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,
    {expiresIn:"1d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"User have successfully registered",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
     
} catch (err) {
    console.error(err);
    return res.status(500).json({
        message: "Internal Server Error"
    });
}
}

/**
 * @name loginUserController
 * @description login an existing user,expects (email or username) and password in the request body
 * @access Public
 */

async function loginUserController(req,res){
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({
            message: "Username/Email and password are required"
        });
    } 
    const user = await userModel.findOne({
    $or: [
        { email: login },
        { username: login }
    ]
    }).select("+password");

    if (!user) {
        return res.status(400).json({
        message: "Invalid credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,
    {expiresIn:"1d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"User have successfully loggedIn",
        user: {
        id: user._id,
        username: user.username,
        email: user.email
        }
    })

}

/**
 * @name logoutUserController
 * @description logout a user
 * @access Public
 */

async function logoutUserController(req,res){
    const token=req.cookies.token
    
    if(token){
        await blacklistTokenModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message:"User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description find user information and response
 * @access Private
 */
async function getMeController(req,res){
    const user=await userModel.findById(req.user.id)
    res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}



module.exports={
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController}