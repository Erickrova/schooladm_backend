import Event from "../models/Event.js"
import Career from "../models/Career.js"

const create = async (req,res) => {
    const {guestsList,initialDate,finalDate,title,description,files,eventCreator} = req.body

    try {
        const eventObject = {
            eventCreator,
            initialDate,
            finalDate,
            title,
            description,
            files,
        }
        const newEvent = await Event.create(eventObject)
        newEvent.title = newEvent.title.toLowerCase()
        newEvent.guests = guestsList
        await newEvent.save()
        return res.status(200).json({msg:"Event created successfully",state:true})
    } catch (error) {
        console.error(error)
    }

}

const getEvent = async (req,res) =>{
    const {id} = req.params
    try {
        const event = await Event.findById(id).populate("guests confirmGuests eventCreator")
        return res.status(200).json(event)
    } catch (error) {
        console.error(error)
    }
}
const getEvents = async (req,res) =>{
    try {
        const events = await Event.find()
        return res.status(200).json(events)
    } catch (error) {
        console.error(error)
    }
}
const getStudentEvents = async (req,res) =>{
    const {id} = req.params
    try {
        const dbEvents = await Event.find()
        const events = dbEvents.filter(event => event.guests.includes(id)) 
        return res.status(200).json(events)
    } catch (error) {
        console.error(error)
        return res.status(400).json({msg:"error",state:false})
    }
}
const confirmGuest = async (req,res)=>{
    const {id,uid} = req.params
    const event = await Event.findById(id)
    try {
        if(event.confirmGuests.some(guest => guest == uid)){
            event.confirmGuests.pop(uid)
            await event.save()
            return res.json({msg:"user disconfirmed",status:false}) 
        }
        event.confirmGuests.push(uid)
        await event.save()
        return res.json({msg:"user confirmed",status:true})  
    } catch (error) {
        return res.json({msg:"something wrong",status:false})  
        
    }
}
const deleteEvent = async (req,res) =>{
    const {id} = req.params
    const event = await Event.findById(id)
    try {
        await event.deleteOne()
        return res.json({msg:"event deleted sucessfully",status:true})  
    } catch (error) {
        return res.json({msg:"something wrong",status:false})  
        
    }

}

export{
    create,
    getEvent,
    getEvents,
    getStudentEvents,
    deleteEvent,
    confirmGuest
}