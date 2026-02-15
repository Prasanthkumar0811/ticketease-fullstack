import mongoose from "mongoose";

export const connectdb=async()=>{
    try{
        // const mongourl='mongodb+srv://Prasanthkumar:Prasanthkumar@cluster0.6vs0nhk.mongodb.net/express';
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log('DB connected')
        })
    }catch(err){
        console.log('DB Error :',err.message)
    }
}