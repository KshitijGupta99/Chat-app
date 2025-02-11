import express from "express"
import { getUSer, login, logout, signup, updatePfp } from "../controllers/auth.controller.js";
import {fetchUser} from "../middlewares/fetchUser.js";

const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.put("/update-pfp", fetchUser, updatePfp);
authRoute.get("/get-user", fetchUser, getUSer);

export default authRoute;