import express from "express";
import dotenv from "dotenv";
import { connectiondb } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();


const PORT= process.env.PORT;

import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js";

app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute)

app.listen(PORT, ()=>{
    console.log("server is running on " + PORT);
    connectiondb();
})