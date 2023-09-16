import mongoose from "mongoose";

const taskSCheema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required:true
    },
    career:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Career"
    },
    description:{
        type: String
    },
    files:[{
        type: String
    }],
    students:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    studentsCompletedTasks:[
        {
            student:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            file:{
                type: String,
                trim:true
            },
            completedDate:{
                type: Date
            },
            qualification:{
                type:Number
            }

        }
    ],
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    semester:{
        type:Number,
        required: true
    },
    initialDate:{
        type:Date,
        required: true
    },
    finalDate:{
        type:Date,
        required: true
    }

})

const Task = mongoose.model("Task",taskSCheema)

export default Task