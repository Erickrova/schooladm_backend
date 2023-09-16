import Career from "../models/Career.js"

const create = async (req,res) => {
    const {name} = req.body
    try {
        const career = await Career.findOne({name})
        if(career){
            const error = new Error("This career alright exist")
            return res.status(400).json({msg:error.message,state:false})
        }
        const newCareer = await Career.create(req.body)
        newCareer.name = newCareer.name.toLowerCase()
        await newCareer.save()
        return res.status(200).json({msg:"Career created successfully",state:true})
    } catch (error) {
        console.error(error)
    }
    
}
const createSemester = async (req,res) => {
    const {career} = req.body
    try {
        const dbCareer = await Career.findById(career)
        if(!dbCareer){
            const error = new Error("This career don't exist")
            return res.status(400).json({msg:error.message,state:false})
        }
        if(dbCareer.semesters.find(semester => semester.semester == req.body.semester)){
            const error = new Error("This semester alright exist")
            return res.status(400).json({msg:error.message,state:false})
        }
        dbCareer.semesters.push({
            semester:req.body.semester,
            career,
            teachers: [req.body.teacher],
            students: [req.body.student],
            subjects: [req.body.subject],
        })
        console.log(dbCareer.semesters)
        await dbCareer.save()
        return res.status(200).json({msg:"Semester created successfully",state:true})
    } catch (error) {
        console.error(error)
    }
    
}
const getCareer = async (req,res) =>{
    const {id} = req.params
    try {
        const career = await Career.findById(id)
        return res.status(200).json(career)
    } catch (error) {
        console.error(error)
    }
}
const getCareers = async (req,res) =>{
    try {
        const careers = await Career.find()
        return res.status(200).json(careers)
    } catch (error) {
        console.error(error)
    }
}
const getStudentSemester = async (req,res) =>{
    const {id,userId} = req.params
    if(!id || !userId){
        return res.json({msg:"hola"})
    }
    try {
        return res.status(200).json("hola")
    } catch (error) {
        console.error(error)
    }
}
const addSubjectToSemester = async (req,res) =>{
    const {career,semester,subjectList} = req.body
    const dbCareer = await Career.findById(career)
    const semesterSubjects = dbCareer.semesters.find(semster => semster.semester == semester).subjects
    if(subjectList.every(subj => semesterSubjects.some(sub => sub == subj._id))){ // checking for new subjects
        return res.status(200).json({msg:"subjects already added",state:true})
    }
    if(dbCareer.semesters.some(semster => semster.semester == semester && semster.subjects.every))
    subjectList.forEach(subj => {
        if(dbCareer.semesters.some(semster => semster.semester == semester & semster.subjects.every(sub => sub != subj._id))) // evaluating that the subject does not exist in the semester
        {
            dbCareer.semesters.forEach(semster => semster.semester == semester && semster.subjects.push(subj._id)) // pushing the subject
        }
    });
    try {
        await dbCareer.save()
        return res.status(200).json({msg:"subjects added successfully",state:true})
    } catch (error) {
        return res.status(200).json({msg:"something wrong",state:false})
    }
    
}
const addStudentToSemester = async (req,res) =>{
    const {career,semester,studentList} = req.body
    const dbCareer = await Career.findById(career)
    const semesterStudents = dbCareer.semesters.find(semster => semster.semester == semester).students
    if(!studentList.every(student => student?.personalData?.career == career )){ // checking for students in career
        return res.status(200).json({msg:"some student is not in the career",state:true})
    }
    if(studentList.every(student => semesterStudents.some(sub => sub == student._id))){ // checking for new students
        return res.status(200).json({msg:"students already added",state:true})
    }
    if(dbCareer.semesters.some(semster => semster.semester == semester && semster.subjects.every))
    studentList.forEach(student => {
        if(dbCareer.semesters.some(semster => semster.semester == semester & semster.students.every(stu => stu != student._id))) // evaluating that the student does not exist in the semester
        {
            dbCareer.semesters.forEach(semster => semster.semester == semester && semster.students.push(student._id)) // pushing the student
        }
    });
    try {
        // await dbCareer.save()
        return res.status(200).json({msg:"students added successfully",state:true})
    } catch (error) {
        return res.status(200).json({msg:"something wrong",state:false})
    }
    
}
const getSubjectsSemesters = async (req,res) =>{
    const {career} = req.params
    const dbCareer = await Career.findById(career).populate({path:"semesters",populate:"subjects"})
    try {
        const allSubjetsSemesters = dbCareer.semesters.map(sem => {
            return {
            semester:sem.semester,
            subjects:sem.subjects
            }
        })
        return res.status(200).json(allSubjetsSemesters)
    } catch (error) {
        console.error(error)
    }
}
export {
    create,
    createSemester,
    getCareer,
    getCareers,
    getStudentSemester,
    addSubjectToSemester,
    addStudentToSemester,
    getSubjectsSemesters
}