import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import careerRoutes from "./routes/careerRoutes.js"
import subjectRoutes from "./routes/subjectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"

const app = express() // instance the server
dotenv.config() // env activation
connectDB() // Database connection
app.use(express.json()) // server understands json

// URLs allowed by the server

const whiteList = [process.env.FRONTEND_URL, process.env.BACKEND_URL]
const corsOptions = {
    origin: function(origin,callback){
        if(whiteList.includes(origin)){
            // puede consultar la API
            callback(null,true)
        }else{
            // no esta permitido su request
            callback(new Error("Error de cors"))
        }
    }
}
app.use(cors(corsOptions))

const PORT = 4000 || process.env.PORT

// api routes
app.use("/api/user",userRoutes)
app.use("/api/career",careerRoutes)
app.use("/api/subject",subjectRoutes)
app.use("/api/task",taskRoutes)
app.use("/api/event",eventRoutes)

app.listen(PORT,()=>{ // start the server
    console.log(`app listen on port 4000 url http://localhost:${PORT}`)
})