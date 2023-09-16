import mongoose from "mongoose";


const eventScheema = new mongoose.Schema({

    guests:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    confirmGuests:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    eventCreator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    initialDate:{
        type:Date,
        required: true
    },
    finalDate:{
        type:Date,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required:true
    },
    description:{
        type: String
    },
    files:[{
        type: String
    }],

})

const Event = mongoose.model("Event",eventScheema)

export default Event