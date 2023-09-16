import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    rank:{
        type: Number,
        trim: true,
        required:true
    },
    personalData:{
        firstName:{
            type: String,
            trim:true,
            required:true
        },
        lastName:{
            type: String,
            trim:true,
            required:true
        },
        career:{
            type: mongoose.Types.ObjectId,
            ref: "Career",  
            required:true
        },
        semester:{
            type: Number,
            trim:true,
            required:true
        },
        documentType:{
            type: String,
            trim:true,
            required:true
        },
        documentNumber:{
            type: Number,
            trim:true,
            required:true
        },
        contactNumber:{
            type: Number,
            trim:true,
            required:true
        },
        streetAdress:{
            type:String,
            trim:true,
            required:true
        }
    },
    email:{
        type: String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

// password encryption
userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
})

// cheking password
userSchema.methods.checkPassword = async function (formPassword) {
    return await bcrypt.compare(formPassword,this.password)
}


const User = mongoose.model("User",userSchema)

export default User