import {create} from "zustand";
import { Axios } from "../lib/axios.js";
import toast from "react-hot-toast";
import { Result } from "postcss";

export const useAuthStore = create((set)=>({
    authUser : null,
    isSigningup : false,
    isLogginIn: false,
    isUpdatingPfp: false,
    isCheckingAuth: true,
    onlineUser: [],
    

    checkAuth: async()=>{
        try {
            const res = await Axios.get("/auth/get-user");

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
            set({authUser: res.data});
            toast.success("Account created successfully ");
            // get().connectSocket();
            console.log(res.message);
            
        } catch (error) {
            toast.error(error.response?.data?.message);
        }finally{
            set({isSigningup: false});
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await Axios.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
    
          get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },

    logout:async ()=>{
        try {
            const res = await Axios.post("/auth/logout");
            set({authUser: null});
            toast.success("logout succesfully");
        } catch (error) {
            toast.error(error);
        }
    },

    updatePfp: async (pfpdata) => {
        try {
            set({isUpdatingPfp: true});
            const res = await Axios.put("/auth/update-pfp", pfpdata);
            toast.success("Pfp changed successfully");
            set({authUser: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingPfp: false });
        }
    }
}));