import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  status: {
    type: String,
    default: "sent" // sent, delivered, seen
  }
});

export default mongoose.model("Message", messageSchema);