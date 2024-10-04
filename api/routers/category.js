import express from "express";
import { addCategory,  getCategory,  getCategorys, updateCategory } from "../controllers/Category.js";
const router = express.Router();

//add category
router.post("/",addCategory)


router.put("/:id",updateCategory)
router.get("/:id",getCategory)

//get category
router.get("/",getCategorys)



export default router
