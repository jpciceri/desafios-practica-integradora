import express from "express";
import viewRouter from "../src/rutas/view.router.js";
import cartsRouter from "../src/rutas/carts.router.js";
import productsRouter from "../src/rutas/products.router.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import {
    Server,
    Socket
} from "socket.io";
import mongoose from "mongoose";
import ChatManager from "./dao/managers/ChatManager.js";

const app = express();
const puerto = 8080;

console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"))

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views")

app.use("/api", cartsRouter);
app.use("/api", productsRouter);
app.use("/", viewRouter);


mongoose.connect("mongodb+srv://juanpc87:juan123@codercluster.xxnkdzq.mongodb.net/ecommerce?retryWrites=true&w=majority")


const httpServer = app.listen(puerto, () => {
    console.log("Servidor Activo en el puerto: " + puerto);
});

const socketServer = new Server(httpServer);

import ProductManager from "./dao/managers/productmanager.js";
const PM = new ProductManager(__dirname + "/files/products.json");
const CM = new ChatManager();

socketServer.on("connection", async (socket) => {
    console.log("Cliente conectado con ID: ", socket.id);
    const listadeproductos = await PM.getProducts({});
    socketServer.emit("envioDeProductos", listadeproductos);

    socket.on("addProduct", async (data) => {
        await PM.addProduct(data);
        const listadeproductos = await PM.getProducts({});
        socketServer.emit("envioDeProductos", listadeproductos);
    });

    socket.on("deleteProduct", async (id) => {
        console.log(id)
        await PM.deleteProduct(id)
        const listadeproductos = await PM.getProducts({})
        socketServer.emit("envioDeProducts", listadeproductos)
    })

    // socket.on("newMessage", async (data) => {
    //     CM.createMessage(data);
    //     const messages = await CM.getMessages();
    //     socket.emit("messages", messages);
    //     });

    socketServer.on("connection", async (socket) => {
        socket.on("newUser", async (data) => {
            const text = "conectado";
            const mensajes = await CM.mensaje(data, text);
    
            socketServer.emit("messageEmit", mensajes);
    
            socket.on("message", async (data1) => {
                const mensajes = await CM.newMensaje(data, data1);
    
                socketServer.emit("messageEmit", mensajes);
            });
    
            socket.on("disconnect", async () => {
                const text = "desconectado";
                const mensajes = await CM.mensaje(data, text);
    
                socketServer.emit("messageEmit", mensajes);
            });
        });
    
        const mensajes = await CM.getAllMessages();
    
        socketServer.emit("messageEmit", mensajes);
    });
    


});