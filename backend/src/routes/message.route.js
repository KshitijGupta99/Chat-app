import express from "express";
import { fetchUser } from "../middlewares/fetchUser.js";
import { allMessage, allUser, sendMsg } from "../controllers/message.contoller.js";

const messageRoute = express.Router()

messageRoute.get("/users", fetchUser, allUser);
messageRoute.get("/allmessage/:id", fetchUser, allMessage)

messageRoute.post("/send/:id", fetchUser, sendMsg);

export default messageRoute;