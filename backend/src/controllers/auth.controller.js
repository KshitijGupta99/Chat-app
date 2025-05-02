import cloudinary from "../lib/cloudniary.js";
import genrateToken from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async(req,res)=>{
    const{fullname, email, password} = req.body;
    try {
        
        if(!fullname || !password || !email){
            return res.status(400).json({message: " All fields are are required !"});
        }

        if(password.length < 6){
            return res.status(400).json({message: " Password should be atleast 6 char long"});
        }

        const user = await User.findOne({email});

        if(user) return res.status(400).json({message: "user with this email already exsist"});

        const salt  = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashpass
        })

        if(newUser){
            genrateToken(newUser._id, res);
            await newUser.save();
            console.log(newUser, "user creaated succefully !")
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email 
            })

        }else{
            return res.status(400).json({message: "Invalid user data"});
        }


    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login =async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email}).select('email password fullname');
        
        if(!user) return res.status(400).json({message: "Invalid Credentials "});
        
        console.log(user);
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({message: " Invalid Credentials!"});

        const token = await genrateToken(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email
            token: token
        })


    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(201).json({message: "logout successfully"});
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updatePfp = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const {pfp} = req.body;
    const userId = req.user._id;
    console.log(userId, "userId")

    if(!pfp) return res.status(400).json({message: " Profile pic required "});
    try {
        const uploadRes = await cloudinary.uploader.upload(pfp, {
            folder: "profile_pictures",  
            transformation: [{ width: 500, height: 500, crop: "limit" }] 
        });

        const updatedUser = await User.findByIdAndUpdate(
            {_id:userId},
            { pfp: uploadRes.secure_url },
            { new: true }
        );
        console.log(updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({ message: "Failed to upload image. Try again." });
    }

}

export const getUSer = async (req, res) => {
    try {
        const user = req.user
        // console.log(user)
        res.status(200).json(user);
    } catch (error) {
        console.log("error in get-user controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}
