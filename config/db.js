import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`db on ${connection.connection.host}:${connection.connection.port}`)
        
    } catch (error) {
        process.exit(1)
        
    }
}

export default connectDB