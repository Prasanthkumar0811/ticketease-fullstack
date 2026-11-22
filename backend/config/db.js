import mongoose from "mongoose";

export const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log('DB connected')
        })
    }catch(err){
        console.log('DB Error :',err.message)
    }
}