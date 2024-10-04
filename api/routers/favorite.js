import express from "express";
import {   verifyToken} from "../utils/verifyToken.js";
import { addFavorite, deleteFavorites, getFavorites } from "../controllers/favorite.js";
const router = express.Router();

router.post("/",verifyToken,addFavorite)
router.get("/:userId",verifyToken,getFavorites)
router.delete("/:userId/:productId",verifyToken,deleteFavorites)

export default router
        