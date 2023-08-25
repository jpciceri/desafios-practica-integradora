import { messageModel } from "../models/message.model.js";


class ChatManager {
	getAllMessages = async () => {
		try {
			const mensajes = await messageModel.find();
			return mensajes;
		} catch (err) {
			console.log(err.message);
		}
	};

	mensaje = async (data, text) => {
		try {
			const newMessage = new messageModel({ mensaje: `${data} se ha ${text}`, nombre: `servidor` });
			await messageModel.create(newMessage);
			const mensajes = await messageModel.find();
			return mensajes;
		} catch (err) {
			console.log(err.message);
		}
	};

	newMensaje = async (data, data1) => {
		try {
			const newMessage = new messageModel({
				mensaje: data1,
				nombre: data,
			});

			await messageModel.create(newMessage);

			const mensajes = await messageModel.find();

			return mensajes;
		} catch (err) {
			console.log(err.message);
		}
	};
}


export default ChatManager;