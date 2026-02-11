import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,require:true,trim:true},
    email:{type:String,requie:true,unique:true,lowercase:true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    phone:{type:String, require:true,unique:true, match:/^[0-9]{10}$/},
    password:{type:String,require:true,minlength:6}

},{timestamps:true})
export const User=mongoose.model('Usersauth',userSchema)