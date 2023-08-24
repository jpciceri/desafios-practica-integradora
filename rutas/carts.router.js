import { Router, json } from "express";
import CartManager from "../managers/cartmanager.js";
import __dirname from "../utils.js"


const manager = new CartManager(__dirname + "/files/carrito.json");

const cartRouter = Router();

cartRouter.get("/cart", async(req,res)=>{
  const carrito = await manager.getCarts();
  res.json({carrito})
});

cartRouter.post("/carts/", async(request, response)=>{
  const NC = await manager.newCart();
  response.json({status:"success", NC});
  
});

cartRouter.get("/carts/:cid",async(request, response)=>{
  const newCartFound = await manager.getCart(request.params);
  response.json({status:"success", newCartFound});

});

cartRouter.post("/carts/:cid/products/:pid", async(req, res) => {
  try{
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    await manager.addProductToCart(cid, pid);
    res.json({status:"success", message:"Producto agregado al carrito"})
  } catch (error) {
          console.error("Error al agregar el producto al carrito");
          res.status(500).json({status:"error", message:"Error no se pudo agregar el producto al carrito"})
  }
  
});


export default cartRouter;