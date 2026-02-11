import jwt from "jsonwebtoken";


const JWT_SECRET="SuperSecretKey123"
export const authMiddleware=(req,res,next)=>{
    const header=req.header.authorization
    if(!header){
        return res.status(401).json({message:'Token Required'})
    }
    const token=header.split(" ")[1]
    try{
     const decoded=jwt.verify(token,JWT_SECRET)
     req.user=decoded
     next()
    }catch(err){
    return res.status(401).json({message:'Invalid Token'})
    }
}