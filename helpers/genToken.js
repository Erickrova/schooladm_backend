import jws from "jsonwebtoken"

function genToken (id){
    return jws.sign({id},process.env.SECRET_WORD,{
        expiresIn:"30d"
    })
}

export default genToken