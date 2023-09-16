import express from "express"
import { create, deleteSubject, getSubject, getSubjects } from "../controller/subjectController.js"
import auth from "../middleware/auth.js"

const router = express.Router()
//get
router.get("/get-subject/:id",auth,getSubject)
router.get("/get-subjects",auth,getSubjects)

//post
router.post("/create",auth,create)

//delete
router.delete("/delete/:id",auth,deleteSubject)



export default router