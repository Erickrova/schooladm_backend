import express from "express"
import { deleteUser, getAdms, getQualifications, getStudents, getTeachers, getUser, getUsers, login, profile, register} from "../controller/userController.js"
import auth from "../middleware/auth.js"

// router instance
const router = express.Router()

//get
router.get("/get-user/:id",getUser)
router.get("/get-users",auth,getUsers)
router.get("/get-students",auth,getStudents)
router.get("/get-teachers",auth,getTeachers)
router.get("/get-adms",auth,getAdms)
router.get("/profile",auth,profile)
router.get("/get-qualifications/:semester/:subject/:id",auth,getQualifications)

//post
router.post("/register",register)
router.post("/login",login)

//delete
router.delete("/delete/:id",auth,deleteUser)


export default router