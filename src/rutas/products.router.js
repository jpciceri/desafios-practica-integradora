import { Router } from "express";
import ProductManager from "../dao/managers/productmanager.js";
import  __dirname  from "../utils.js";

const productsRouter = Router();
const manager = new ProductManager();

productsRouter.get("/products", async (request, response)=>{
    let {limit}=request.query
    const products = await manager.getProducts(limit)
    
    response.send({products});
});


productsRouter.get("/products/:pid", async (request, response)=>{
    let pid = request.params.pid;
    const products = await manager.getProductById(pid);

    response.send({products});
});

productsRouter.post("/products", async (req, res) => {
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;

    if (!title) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
        return false;
    }

    if (!description) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
        return false;
    }

    if (!code) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
        return false;
    }

    if (!price) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
        return false;
    }

    status = !status && true;

    if (!stock) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
        return false;
    }

    if (!category) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
        return false;
    }

    if (!thumbnails) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails!"});
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        res.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el Array Thumbnails!"});
        return false;
    }

    const result = await manager.addProduct({title, description, code, price, status, stock, category, thumbnails}); 

    if (result) {
        res.send({status:"ok", message:"El Producto se agregó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo agregar el Producto!"});
    }
});

// productsRouter.post("/products", async (request,response)=>{
//     const newProduct = await manager.addProduct(request.body);
//     response.json({status:"success", newProduct})
// });

productsRouter.put("/products/:pid", async (req, res) => {
    let pid = req.params.pid;
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;

    if (!title) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
        return false;
    }

    if (!description) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
        return false;
    }

    if (!code) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
        return false;
    }

    if (!price) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
        return false;
    }

    status = !status && true;

    if (!stock) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
        return false;
    }

    if (!category) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
        return false;
    }

    if (!thumbnails) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails!"});
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        res.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el Array Thumbnails!"});
        return false;
    }

    const result = await manager.updateProduct(pid, {title, description, code, price, status, stock, category, thumbnails});

    if (result) {
        res.send({status:"ok", message:"El Producto se actualizó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo actualizar el Producto!"});
    }
});

productsRouter.delete("/products/:pid", async (req, res) => {
    let pid = req.params.pid;
    const result = await manager.deleteProduct(pid)

    if (result) {
        res.send({status:"ok", message:"El Producto se eliminó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo eliminar el Producto!"});
    }
});

export default productsRouter;


// productsRouter.put("/products/:pid", async (request,response)=>{
//     const UP = await manager.updateProduct(request.params, request.body);
//     response.json({status:"success", UP});
// });

// productsRouter.delete("/products/:pid", async (request, response) => {
//     const id = parseInt(request.params.pid);
//     const eliminarP = await manager.deleteProduct(id);
//     response.json({status:"success", eliminarP});
// });

// export default productsRouter;