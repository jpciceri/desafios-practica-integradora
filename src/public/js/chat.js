// const socket = io();
// const messages = document.getElementById("messages");

// socket.on("messages", (data) => {
//     let salida = ``;

//     data.forEach(item => {
//         salida += `<p class="card-text"><b>${item.user}:</b> <span class="fw-light">${item.message}</span></p>`;
//     });

//     messages.innerHTML = salida;
// });

// const sendMessage = () => {
//     const user = document.getElementById("user");
//     const message = document.getElementById("message");
//     socket.emit("newMessage", {user: user.value,message: message.value});
//     user.value = "";
//     message.value = "";
// }

// const btnSendMessage = document.getElementById("btnSendMessage");
// btnSendMessage.onclick = sendMessage;

const socket = io();
const $inputMessage = document.querySelector("#message");
const $listaMensajes = document.querySelector("#listMessages");
const $btnEnviar = document.querySelector("#btnEnviar");

Swal.fire({
	title: "Bienvenido al chat",
	input: "text",
	inputLabel: "Ingrese su nombre",
	inputPlaceholder: "Ingrese su nombre",
	confirmButtonText: "Ingresar",
	allowOutsideClick: false,
	allowEscapeKey: false,
	stopKeydownPropagation: false,
}).then((result) => {
	if (result.isConfirmed) {
		socket.emit("newUser", result.value);
	}
});

const enviarMensaje = (e) => {
	e.preventDefault();
	const mensaje = $inputMessage.value;

	mensaje.trim();
	$inputMessage.value = "";

	if (!mensaje) return;

	socket.emit("message", mensaje);
};

$btnEnviar.addEventListener("click", enviarMensaje);

socket.on("messageEmit", async (data) => {
	$listaMensajes.innerHTML = "";

	const mensajes = await data.slice(-10);

	await mensajes.forEach((element) => {
		$listaMensajes.innerHTML += `<p><b>${element.nombre}</b>: ${element.mensaje}</p>`;
	});
});
