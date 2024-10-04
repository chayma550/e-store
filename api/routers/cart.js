import express from "express";
import {   verifyToken, verifyTokenAdmin} from "../utils/verifyToken.js";
import { addCart,  deleteCart, getCart, getCarts, resetCart, updateCart } from "../controllers/cart.js";
const router = express.Router();

router.post("/",verifyToken,addCart)
router.get("/:userId",verifyToken,getCart)
router.put("/:id",verifyToken,updateCart)
router.delete("/:userId/:productId",verifyToken,deleteCart)
router.delete("/:userId",verifyToken,resetCart)

router.get("/",verifyTokenAdmin,getCarts)
export default router
