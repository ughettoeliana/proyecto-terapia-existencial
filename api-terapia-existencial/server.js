import express from "express";
import { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/user.js";
import serviceRoute from "./routes/service.js";
import feedbackRoute from "./routes/feedback.js";
import appointmentRoute from "./routes/appointment.js";
//import AccountRoute from './routes/account.js';

const app = express();
app.use(
  cors({
    origin: ["https://deploy-mern-lwhq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", userRoute);
app.use("/api", serviceRoute);
app.use("/api", feedbackRoute);
app.use("/api", appointmentRoute);

mongoose
  .connect('mongodb+srv://elianaughetto:elianaughetto12122001@cluster0.pdr7igi.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log("connected to mongodb atlas");
  })
  .catch((e) => {
    console.error(e);
  });

app.listen(3000, function () {
  console.log("El servidor está levantado: http://localhost:3000/");
});
