import { Router } from "express";
import ProductManager from "../dao/managers/productmanager.js";
import  __dirname  from "../utils.js";


const pmanager = new ProductManager(__dirname + "/files/products.json");
const router = Router();

router.get("/", async(req,res)=>{
    const listaProductos = await pmanager.getProducts({});
    console.log(listaProductos);
    res.render("home", {listaProductos});
});

router.get("/realtimeProducts", (req,res)=>{
    res.render("realtimeProducts");
});

router.get("/chat", (req, res) => {
    res.render("chat");
});

export default router;
