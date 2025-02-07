import express from "express";
import { fetchUser } from "../middlewares/fetchUser";
import { allMessage, allUser, sendMsg } from "../controllers/message.contoller";

const messageRoute = express.Router()

messageRoute.get("/users", fetchUser, allUser);
messageRoute.get("/allmessage/:id", fetchUser, allMessage)

messageRoute.post("/send/:id", fetchUser, sendMsg);

export default messageRoute;