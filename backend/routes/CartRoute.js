import express from 'express'
import {addToCart,getCart, clearCart, decreaseqtyCart, increaseqtyCart, removeFromCart} from "../controller/CartController.js"
import authMiddleware from "../middleware/auth.js";
const cartRoute = express.Router();


cartRoute.post("/add", authMiddleware,addToCart)
cartRoute.post("/decrease", authMiddleware,decreaseqtyCart)
cartRoute.post("/get", authMiddleware,getCart)
cartRoute.post("/increase", authMiddleware,increaseqtyCart)
cartRoute.post("/clear",authMiddleware,clearCart)
cartRoute.post("/remove", authMiddleware, removeFromCart);

export default cartRoute;