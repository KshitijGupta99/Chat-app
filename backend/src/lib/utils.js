import jwt from "jsonwebtoken";

const genrateToken = (userId, res)=>{
    const key = process.env.JWT_SECRET

    const token = jwt.sign({userId}, key);

    res.cookie("token", token, {httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development"});

    return token;

}

export default genrateToken;