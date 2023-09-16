import genToken from "../helpers/genToken.js"
import User from "../models/User.js"
import Task from "../models/Task.js"

const register = async (req,res) => {
    const {email} = req.body
    try {
        const user = await User.findOne({email})
        if(user){
            const error = new Error("This user alright exist")
            return res.status(400).json({msg:error.message,state:false})
        }
        const newUser = await User.create(req.body)
        newUser.personalData.firstName = newUser.personalData.firstName.toLowerCase()
        newUser.personalData.lastName = newUser.personalData.lastName.toLowerCase()
        await newUser.save()
        return res.status(200).json({msg:"User created successfully",state:true})
    } catch (error) {
        console.error(error)
    }
    
}
const login = async (req,res) =>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            const error = new Error("This user Don't exist")
            return res.status(404).json({msg:error.message,state:false})
        }
        if(await user.checkPassword(password)){
            
            return res.status(200).json({session:{
                _id:user._id,
                name: user.personalData.firstName + " " + user.personalData.lastName,
                rank: user.rank,
                token: genToken(user._id)
            },state:true})
        }else{
            const error = new Error("The password is incorrect")
            return res.status(403).json({msg:error.message,state:false})
        }

    } catch (error) {
        console.error(error)
    }
}
const getUser = async (req,res) =>{
    const {id} = req.params
    try {
        const user = await User.findById(id).select("-password").populate({
        path:"personalData",
        populate:{path:"career",
        populate:{path:"semesters",
        populate:{path:"teachers students subjects"}}
    }})
        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
}
const getUsers = async (req,res) =>{
    try {
        const users = await User.find().select("-password")
        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
    }
}
const getStudents = async (req,res) =>{
    try {
        const students = await User.find({rank:1}).select("-password")
        return res.status(200).json(students)
    } catch (error) {
        console.error(error)
    }
}
const getTeachers = async (req,res) =>{
    try {
        const teachers = await User.find({rank:2}).select("-password")
        return res.status(200).json(teachers)
    } catch (error) {
        console.error(error)
    }
}
const getAdms = async (req,res) =>{
    try {
        const adms = await User.find({rank:3}).select("-password")
        return res.status(200).json(adms)
    } catch (error) {
        console.error(error)
    }
}
const getQualifications = async (req,res)=>{
    const {subject,semester,id} = req.params
    const tasksDB = await Task.find()
    const tasks = tasksDB.filter(tsk => tsk.semester == semester && tsk.subject == subject)
    const qualifiedTasks = tasks.filter(tsk=> tsk.studentsCompletedTasks.some(completedtsk => completedtsk.student == id && completedtsk.qualification >= 0))
    const qualifications = qualifiedTasks.map(tsk => tsk.studentsCompletedTasks.map(tk => tk.student == id ? {task:tsk,studentTask:tk}:null)).filter(tsk => tsk != null ).flat()
    return res.json(qualifications)
}
const deleteUser = async (req,res)=>{
    const {id} = req.params
    const user = await User.findById(id)
    try {
        await user.deleteOne()
        return res.json({msg:"user deleted sucessfully",status:true})  
    } catch (error) {
        return res.json({msg:"something wrong",status:false}) 
    }
}
const profile = (req,res) =>{
    const {user} = req
    return res.json(user)
}

export{
    register,
    login,
    profile,
    getUser,
    getUsers,
    getStudents,
    getTeachers,
    getAdms,
    getQualifications,
    deleteUser

}