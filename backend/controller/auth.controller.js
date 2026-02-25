import { User } from "../model/auth.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET="SuperSecretKey123"
export const register=async(req,res)=>{
    try{
      const {name,email,phone,password,confirmPassword}=req.body
      if(!name || !email || !phone || !password || !confirmPassword){
        return res.status(400).json({message:'All fields are required'})
      }
      if(password !== confirmPassword){
        return res.status(400).json({message:'Password do not match'})
      }
      const exisitingemail=await User.findOne({email})
      if(exisitingemail){
        return res.status(400).json({message:'Email already exists'})
      }
      const exisitingphone=await User.findOne({phone})
      if(exisitingphone){
        return res.status(400).json({message:'Phone already exists'})
      }
      const hashedpassword=await bcrypt.hash(password,10);

      const createUser=await User.create({
        name,
        email,
        phone,
        password:hashedpassword
      })
      res.status(201).json({
        message:'User Created Successfully',
        Userid:createUser._id
      })
    }catch(err){
       res.status(500).json({message:err.message})
    }
}

export const login=async(req,res)=>{
  try{
 const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:'Email and password is required'})
    }
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:'Invalid email'})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:'Invalid Password'})
    }
    const token=jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'10m'})
    res.status(200).json({
      message:'Login successful',
      token,
      user:{
        id:user._id,
        name:user.name
      }
    })
  }catch(err){
     return res.status(500).json({message:err.message})
  }
   
}