const mongoose=require("mongoose")


/**
 * - job Description Schema:String
 * - resume text:String
 * - self description:String
 * 
 * - matchScore:Number
 * 
 * - Technical questions :
 *      [{
 *      question:"",
 *      answer:"",
 *      intention:"",
 *      }]
 * - Behaviorial question:
 *      [{
 *      question:"",
 *      answer:"",
 *      intention:"",
 *      }]
 * - skill gaps:[{
 *        skill:"",
 *        severity:{
 *            type:String,
 *            enum:["low","medium","high"]
 *           }
 * }]
 * 
 * - preparation plan:[{
 *      day:Number,
 *      focus:String,
 *      tasks:[String]
 *       }]
 */
const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Question is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    }
},{
    _id:false
})

const behaviorialQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Question is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    }
},{
    _id:false
})
const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    }
},{
    id:false
})

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:String,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
        
    },
    tasks:[{
        type:String,
        required:[true,"task is required"]
    }]
})
const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:true
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behaviorialQuestions:[behaviorialQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema]
},{
    timestamps:true
})


const interviewReportModel=mongoose.model("interviewReport",interviewReportSchema)


module.exports=interviewReportModel