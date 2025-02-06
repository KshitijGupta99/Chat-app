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

        genrateToken(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email 
        })


    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('cookie_name');
        res.status(201).json({message: "logout successfully"});
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}