import mongoose from "mongoose";


const subjectScheema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        teachers:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        students:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        tasks:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Task"
        }]
    }
)

const Subject = mongoose.model("Subject",subjectScheema)

export default Subject