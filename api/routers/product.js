import express from "express";
import {   verifyToken, verifyTokenAdmin} from "../utils/verifyToken.js";
import { addProduct, deleteProduct,  getProduct, getProducts, getProductsByIds, updateProduct } from "../controllers/product.js";
const router = express.Router();

router.post("/",verifyTokenAdmin,addProduct)
router.post('/bulk',verifyToken ,getProductsByIds);
router.put("/:id",verifyTokenAdmin,updateProduct)
router.delete("/:id",verifyTokenAdmin,deleteProduct)
router.get("/:id",getProduct)
router.get("/",getProducts)




export default router
