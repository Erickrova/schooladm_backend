import Subject from "../models/Subject.js"


const create = async (req,res) => {
    const {name} = req.body
    try {
        const subject = await Subject.findOne({name})
        if(subject){
            const error = new Error("This subject alright exist")
            return res.status(400).json({msg:error.message,state:false})
        }
        const subjectObject = {
            name,
            description:req.body?.description
        }
        const newSubject = await Subject.create(subjectObject)
        newSubject.name = newSubject.name.toLowerCase()
        newSubject.teachers.push(req.body.teacher)
        await newSubject.save()
        return res.status(200).json({msg:"Subject created successfully",state:true})
    } catch (error) {
        console.error(error)
    }
    
}
const getSubject = async (req,res) =>{
    const {id} = req.params
    try {
        const subject = await Subject.findById(id)
        return res.status(200).json(subject)
    } catch (error) {
        console.error(error)
    }
}
const getSubjects = async (req,res) =>{
    try {
        const subjects = await Subject.find()
        return res.status(200).json(subjects)
    } catch (error) {
        console.error(error)
    }
}

const deleteSubject = async (req,res)=>{
    const {id} = req.params
    const subject = await Subject.findById(id)
    try {
        await subject.deleteOne()
        return res.json({msg:"subject deleted sucessfully",status:true})  
    } catch (error) {
        return res.json({msg:"something wrong",status:false}) 
    }
}

export{
    create,
    getSubject,
    getSubjects,
    deleteSubject
}