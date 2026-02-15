import express from 'express';
import cors from "cors";
import router from './route/auth.route.js';
import { connectdb } from './config/db.js';
import dotenv from "dotenv";

dotenv.config()

await connectdb()
const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/authverify',router)
const PORT=process.env.PORT || 3000
app.listen(PORT,"0.0.0.0",()=>{
    console.log('Started')
})