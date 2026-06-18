import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:String,
    receiverId:String,
    text:String,
    delivered:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const messageModel = mongoose.model("message",messageSchema);