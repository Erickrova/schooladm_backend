import Task from "../models/Task.js"
import Subject from "../models/Subject.js"
import Career from "../models/Career.js"

const create = async (req,res) => {
    const {career,semester,subject,title,description,files,initialDate,finalDate,teacher} = req.body
    const dbCareer = await Career.findById(career)
    const dbSemester = dbCareer.semesters.find(smt => smt.semester == semester)
    try {
        const taskObject = {
            career,
            subject,
            title,
            description,
            files,
            initialDate,
            finalDate,
            teacher,
            semester
        }
        const newTask = await Task.create(taskObject)
        newTask.title = newTask.title.toLowerCase()
        newTask.students = dbSemester.students
        const dbSubject = await Subject.findById(subject)
        dbSubject.tasks.push(newTask._id)
        Promise.all([
            await newTask.save(),
            await dbSubject.save()
        ])
        return res.status(200).json({msg:"Task created successfully",state:true})
    } catch (error) {
        console.error(error)
    }

}
const getTask = async (req,res) =>{
    const {id} = req.params
    try {
        const task = await Task.findById(id)
        return res.status(200).json(task)
    } catch (error) {
        console.error(error)
    }
}
const getTasks = async (req,res) =>{
    try {
        const tasks = await Task.find()
        return res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
    }
}
const getStudentTasks = async (req,res) =>{
    const {id} = req.params
    try {
        const dbTasks = await Task.find()
        const tasks = dbTasks.filter(task => task.students.includes(id)) 
        return res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
    }
}
const getTeacherTasks = async (req,res) =>{
    const {id} = req.params
    try {
        const dbTasks = await Task.find()
        const tasks = dbTasks.filter(task => task.teacher == id) 
        return res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
    }
}
const sendTask = async (req,res) =>{
    const {id,studentTask} = req.body
    const task = await Task.findById(id)
    if(task.studentsCompletedTasks.some(tsk => tsk?.student == studentTask?.student)){
        const error = new Error("you already sent the task")
        return res.status(400).json({msg:error.message,state:false})
    }
    studentTask.completedDate = Date.now()
    task.studentsCompletedTasks.push(studentTask)
    await task.save()
    return res.json({msg:"task sent successfully",state:false})

}
const getSentTasks = async (req,res) =>{
    const {id} = req.params
    const task = await Task.findById(id).populate({path:"studentsCompletedTasks",populate:"student"})
    const sentTasks = task.studentsCompletedTasks
    return res.json(sentTasks)
}
const getSentStudentTask = async (req,res) =>{
    const {id,ui} = req.params
    const task = await Task.findById(id).populate({path:"studentsCompletedTasks",populate:"student"})
    const sentTask = task.studentsCompletedTasks?.find(tsk => tsk.student._id == ui)
    return res.json(sentTask)
}
const qualifyTask = async (req,res) =>{
    const {id,ui,qualification} = req.body
    const task = await Task.findById(id)
    const sentTask = task.studentsCompletedTasks?.find(tsk => tsk.student == ui)
    if(sentTask.qualification == qualification){
        return res.json({msg:"qualification is the same"})
    }
    sentTask.qualification = qualification
    task.studentsCompletedTasks.pop(tsk => tsk.student == ui)
    task.studentsCompletedTasks.push(sentTask)
    try {
        await task.save()
        return res.json({msg:"qualification updated"})
    } catch (error) {
        return res.json({msg:"something wrong"})
        
    }
}
const getQualifiedTasks = async (req,res) =>{
    const {id} = req.params
    const tasks = await Task.find()
    const qualifiedTasks = tasks.filter(tsk=> tsk.studentsCompletedTasks.some(completedtsk => completedtsk.student == id && completedtsk.qualification >= 0))
    const completedTasks = qualifiedTasks.map(tsk => tsk.studentsCompletedTasks.map(tk => tk.student == id ? {task:tsk,studentTask:tk}:null)).filter(tsk => tsk != null )
    const data = completedTasks.flat()
    return res.json(data)
}

const deleteTask = async (req,res) =>{
    const {id} = req.params
    const task = await Task.findById(id)
    try {
        await task.deleteOne()
        return res.json({msg:"task deleted sucessfully",status:true})  
    } catch (error) {
        return res.json({msg:"something wrong",status:false})  
        
    }
}


export{
    create,
    getTask,
    getTasks,
    getStudentTasks,
    getTeacherTasks,
    sendTask,
    getSentTasks,
    getSentStudentTask,
    qualifyTask,
    getQualifiedTasks,
    deleteTask
}