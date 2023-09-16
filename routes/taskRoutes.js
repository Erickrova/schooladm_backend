import express from "express"
import { create, deleteTask, getQualifiedTasks, getSentStudentTask, getSentTasks, getStudentTasks, getTask, getTasks, getTeacherTasks, qualifyTask, sendTask } from "../controller/taskController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

//get
router.get("/get-task/:id",auth,getTask)
router.get("/get-tasks",auth,getTasks)
router.get("/get-student-tasks/:id",auth,getStudentTasks)
router.get("/get-teacher-tasks/:id",auth,getTeacherTasks)
router.get("/get-sent-tasks/:id",auth,getSentTasks)
router.get("/get-student-sent-task/:id/:ui",auth,getSentStudentTask)
router.get("/get-qualified-tasks/:id",auth,getQualifiedTasks)


//post
router.post("/create",auth,create)
router.post("/sendTask",auth,sendTask)
router.post("/qualify-task",auth,qualifyTask)

//delete
router.delete("/delete/:id",auth,deleteTask)




export default router