import {create} from "zustand";
import { Axios } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useMessageStore = create((set)=>({
    selectedUser : null,
    isFetchingUser : false,
    users : null,
    chats: null,
    isFetchingChat : false,

    getUser : async () => {
        set({isFetchingUser: true});
        try {
            const res = await Axios.get("/message/users");
            set({users: res.data});

        } catch (error) {
            console.log("error in getuser in Msg store", error);
        }finally{
            set({isFetchingUser: false});
        }
    },

    getChat : async(reciver_id)=>{
        set({isFetchingChat: true});
        try {
            const res = await Axios.get(`/message/allmessage/${reciver_id}`);
            set({chats:  res.data});
        } catch (error) {
            console.log("error in getchat at msgStore", error);
        }finally{
            set({isFetchingChat: false});
        }
    }

}))