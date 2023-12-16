import express from "express";
import { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './routes/user.js';
import serviceRoute from './routes/service.js';
import feedbackRoute from './routes/feedback.js';
import appoinmentRoute from './routes/appointment.js';
//import AccountRoute from './routes/account.js';


const app = express();
//app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use(express.json());
app.use('/api', userRoute)
app.use('/api', serviceRoute)
app.use('/api', feedbackRoute)
app.use('/api', appoinmentRoute)


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log('connected to mongodb atlas')
}).catch((e)=>{console.error(e)})

app.listen(3000, function () {
  console.log("El servidor está levantado: http://localhost:3000/");
});
