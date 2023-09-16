import mongoose, { Types } from "mongoose";


const careerScheema = new mongoose.Schema(
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
        semesters:
        [{
            semester:{
                type: Number,
                required:true
            },
            Career:{
                type: mongoose.Types.ObjectId,
                ref: "Career"
            }
            ,
            teachers:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"User"
                }
            ],
            students:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"User"
                }
            ],
            subjects:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Subject"
                }
            ],
        }]
    }
)

const Career = mongoose.model("Career",careerScheema)

export default Career