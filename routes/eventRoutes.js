import express from "express"
import { confirmGuest, create, deleteEvent, getEvent, getEvents, getStudentEvents } from "../controller/eventController.js"
import auth from "../middleware/auth.js"

const router = express.Router()


//get
router.get("/get-event/:id",auth,getEvent)
router.get("/get-events",auth,getEvents)
router.get("/get-student-events/:id",auth,getStudentEvents)


//post
router.post("/create",auth,create)
// put
router.put("/confirm/guest/:id/:uid",auth,confirmGuest)
// delete
router.delete("/delete/:id",auth,deleteEvent)




export default router