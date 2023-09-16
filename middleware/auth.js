import jwt from "jsonwebtoken"
import User from "../models/User.js"


async function auth (req,res,next){
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1] // geting token
            const decoded = jwt.verify(token,process.env.SECRET_WORD) // decoding token
            const {id} = decoded
            const user = await User.findById(id).select("_id personalData rank")
            if(user){
                req.user = {
                    _id:user._id,
                    name: user.personalData.firstName + " " + user.personalData.lastName,
                    rank: user.rank,
                }
                return next() // allow authentication
            }
        } catch (error) {
            return res.status(400).json({msg:"You do not have permission3"})
        }
    }
    if(!token){
        return res.status(400).json({msg:"You do not have permission2"})
    }

}

export default auth