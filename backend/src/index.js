import express from "express";
import dotenv from "dotenv";
import { connectiondb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { app, server } from "./lib/socket.js";


dotenv.config();


const PORT= process.env.PORT;

import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js";

app.use(cookieParser());
const corsOptions ={
    origin:['http://localhost:5173','https://chat-app-neon-theta.vercel.app'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));  
app.use(express.urlencoded({ limit: "50mb", extended: true }));  


app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute)

server.listen(PORT, ()=>{
    console.log("server is running on " + PORT);
    connectiondb();
})