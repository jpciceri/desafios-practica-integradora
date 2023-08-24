import express from "express";
import viewRouter from "./rutas/view.router.js";
import cartRouter from "./rutas/carts.router.js";
import productsRouter from "./rutas/products.router.js";
import  __dirname  from "./utils.js";
import handlebars from "express-handlebars";
import { Server, Socket } from "socket.io";

const app = express();
const puerto =8080;

console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine());
app.set("view engine","handlebars");
app.set("views", __dirname+"/views")

app.use("/api", cartRouter);
app.use("/api", productsRouter);
app.use("/", viewRouter);


const httpServer=app.listen(puerto, () => {
    console.log("Servidor Activo en el puerto: " + puerto);
});

const socketServer = new Server(httpServer);

import ProductManager from "./managers/productmanager.js";
const PM = new ProductManager(__dirname+"/files/products.json");

socketServer.on("connection", async (socket)=>{
    console.log("Cliente conectado con ID: ", socket.id);
    const listadeproductos = await PM.getProducts({});
    socketServer.emit("envioDeProductos", listadeproductos);

    socket.on("addProduct", async(obj)=>{
        await PM.addProduct(obj);
        const listadeproductos = await PM.getProducts({});
        socketServer.emit("envioDeProductos", listadeproductos);    
    });
    
    socket.on("deleteProduct",async(id)=>{
        console.log(id)
        await PM.deleteProduct(id)
        const listadeproductos=await PM.getProducts({})
        socketServer.emit("envioDeProducts",listadeproductos)
        })
});
