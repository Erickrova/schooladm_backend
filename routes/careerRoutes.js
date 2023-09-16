import express from "express";
import { addStudentToSemester, addSubjectToSemester, create, createSemester, getCareer, getCareers, getStudentSemester, getSubjectsSemesters } from "../controller/careerController.js";
import auth from "../middleware/auth.js";

const router = express.Router()
//get
router.get("/get-career/:id",auth,getCareer)
router.get("/get-careers",auth,getCareers)
router.get("/test/:id/:userId",auth,getStudentSemester)
router.get("/get-subjects-semesters/:career",auth,getSubjectsSemesters)
//post
router.post("/create",auth,create)
router.post("/create/semester",auth,createSemester)
// patch // put
router.patch("/add-subject-to-semester",auth,addSubjectToSemester)
router.patch("/add-student-to-semester",auth,addStudentToSemester)

export default router