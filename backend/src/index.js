import express from "express";
import dotenv from "dotenv";
import { connectiondb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

dotenv.config();


const PORT= process.env.PORT;

import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js";

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json({ limit: "10mb" }));  
app.use(express.urlencoded({ limit: "10mb", extended: true }));  


app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute)

app.listen(PORT, ()=>{
    console.log("server is running on " + PORT);
    connectiondb();
})