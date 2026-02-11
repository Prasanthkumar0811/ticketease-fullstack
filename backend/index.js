import express from 'express';
import cors from "cors";
import router from './route/auth.route.js';
import { connectdb } from './config/db.js';


await connectdb()
const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/authverify',router)
app.listen('3000',()=>{
    console.log('Started')
})