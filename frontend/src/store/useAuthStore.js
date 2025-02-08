import {create} from "zustand";
import { Axios } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser : null,
    isSigningup : false,
    isLogginIn: false,
    isUpdatingPfp: false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const res = await Axios.get("/auth/check");

            set({authUser: res.data})
        } catch (error) {
            set({authUser: null});
            console.log("erorr in auth store ", error);
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup : async (data)=>{
        set({isSigningup : true});
        try {
            console.log(data)
            const res = await Axios.post("/auth/signup", data);
            toast.success("Account created successfully ");
            set({authUser: res.data});
            
        } catch (error) {
            toast.error(error);
        }finally{
            set({isSigningup: false});
        }
    },

    logout:async ()=>{
        try {
            const res = await Axios.post();
            toast.success("logout succesfully");
        } catch (error) {
            toast.error(error);
        }
    }
}));