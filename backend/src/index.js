import express from "express";
import dotenv from "dotenv";
import { connectiondb } from "./lib/db.js";

const app = express();

dotenv.config();


const PORT= process.env.PORT;

import authRoute from "./routes/auth.route.js"

app.use(express.json())

app.use("/api/auth", authRoute);

app.listen(PORT, ()=>{
    console.log("server is running on " + PORT);
    connectiondb();
})