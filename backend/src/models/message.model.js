import mongoose, { mongo } from "mongoose";

const msgSchema =  new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reciverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text:{
        type: String,
    },
    images:{
        type: String,
    }},
    {timestamps: true}
);

const Message = mongoose.model("Message", msgSchema);
export default Message;