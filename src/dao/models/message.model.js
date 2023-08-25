import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//     user:String,
//     message:String
// });

// export const messageModel = mongoose.model("messages", messageSchema);

const messagesCollection = "messages";

const messageSchema = new mongoose.Schema({
	nombre: String,
	mensaje: String,
});

export const messageModel = mongoose.model(messagesCollection, messageSchema);
