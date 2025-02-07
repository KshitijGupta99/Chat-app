import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const fetchUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) return res.status(401).json({message:"No token provided"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({message:"False token provided"});

        const user = await User.findById(decoded.userId).lean();

        if(!user){
            return res.status(401).json({message:"No user found"});
        }

        req.user = user;
        console.log(user)

        next();

    } catch (error) {
        console.log("error in fetchuser", error);
        return res.status(500).json({message: "INternal server error"});
    }
}