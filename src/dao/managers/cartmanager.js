import { cartModel } from "../models/cart.model.js";

class CartManager {
    async newCart() {
        await cartModel.create({products:[]});
        console.log("Cart created!");

        return true;
    }

    async getCart(id) {
        if (this.validateId(id)) {
            return await cartModel.findOne({_id:id}).lean() || null;
        } else {
            console.log("Not found!");
            
            return null;
        }
    }

    async getCarts() {
        return await cartModel.find().lean();
    }

    async addProductToCart(cid, pid) {
        try {
            if (this.validateId(cid)) {
                const cart = await this.getCart(cid);
                const product = cart.products.find(item => item.product === pid);

                if (product) {
                    product.quantity+= 1;
                } else {
                    cart.products.push({product:pid, quantity:1});
                }

                await cartModel.updateOne({_id:cid}, {products:cart.products});
                console.log("Product added!");
    
                return true;
            } else {
                console.log("Not found!");
                
                return false;
            }
        } catch (error) {
            return false
        }
    }
    
    validateId(id) {
        return id.length === 24 ? true : false;
    }
}

export default CartManager;
// import fs from "fs"

// export default class CartManager {
//     constructor(path) {
//         this.path = path;

//     }


//     //Crea el nuevo carrito
//     newCart = async () => {
//         const listOfCarts = await this.getCarts();
//         const id = await this.generateId();
//         const newCart = {
//             id: this.generateId(),
//             products: []
//         };
//         listOfCarts.push(newCart);
//         await fs.promises.writeFile(this.path, JSON.stringify(listOfCarts, null, 2))
//         this.saveCart();
//         console.log("SE CREO EL CARRITO");

//         return true;
//     }
//     //Obtiene el carrito por su id
//     getCart = async (id) => {
//         const {
//             cid
//         } = id;
//         const allCarts = await this.getCarts();
//         const found = allCarts.find(elemento => elemento.id === parseInt(cid));
//         if (found) {
//             return found
//         } else {
//             console.log("Carrito no encontrado");
//         }

//     }
//     //Muestra el array de carritos
//     getCarts = async () => {
//         try {
//             if (fs.existsSync(this.path)) {
//                 let carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

//                 return carts;
//             } else {
//                 return []
//             }
//         } catch (error) {
//             throw new Error(error)
//         }
//     }
//     //Genera el id para cada carrito
//     generateId = async () => {
//         if (fs.existsSync(this.path)) {
//             const idG = await this.getCarts();
//             const counter = idG.lenght;
//             if (counter === 0) {
//                 return 1;
//             } else {
//                 return (idG[counter - 1].id) + 1;
//             }
//         }
//         let max = 0;
//         let carts = this.getCarts();

//         carts.forEach(item => {
//             if (item.id > max) {
//                 max = item.id;
//             }
//         });

//         return max + 1;
//     }
//     //Guarda el carrito
//     saveCart() {
//         fs.writeFileSync(this.path, JSON.stringify(this.carts));
//     }
//     //Agrega el producto seleccionado por su id al carrito seleccionado por este mismo metodo
//     addProductToCart = async (cid, pid) => {
//         const list = await this.getCarts();
//         const cart = list.find(item => item.id === cid);
//         let product = cart.products.findIndex(item => item.pid === pid);

//         if (product !== -1) {
//             cart.products[product].quantity++;
//         } else {
//             cart.products.push({
//                 product: pid,
//                 quantity: 1
//             });
//         }

//         await fs.promises.writeFile(this.path, JSON.stringify(list, null, 2))
//     }
// }