import { Router } from "express";
import ProductManager from "../managers/productmanager.js";
import  __dirname  from "../utils.js";

const productsRouter = Router();
const manager = new ProductManager(__dirname+"/files/products.json");

productsRouter.get("/products", async (request, response)=>{
    const {limit}=request.query
    const product = await manager.getProducts()
    if(limit){
        const limitProds = product.slice(0, limit)
        response.json({status:"Success", limitProds})
    } else{
        response.json({status:"Success", product})
    }
});


productsRouter.get("/products/:pid", async (request, response)=>{
    const products = await manager.getProductsById(request.params);
    response.json({status:"success", products});
});


productsRouter.post("/products", async (request,response)=>{
    const newProduct = await manager.addProduct(request.body);
    response.json({status:"success", newProduct})
});


productsRouter.put("/products/:pid", async (request,response)=>{
    const UP = await manager.updateProduct(request.params, request.body);
    response.json({status:"success", UP});
});

productsRouter.delete("/products/:pid", async (request, response) => {
    const id = parseInt(request.params.pid);
    const eliminarP = await manager.deleteProduct(id);
    response.json({status:"success", eliminarP});
});

export default productsRouter;