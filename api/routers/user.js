import express from "express";
import {  verifyToken, verifyTokenAdmin } from "../utils/verifyToken.js";
import { deleteUser, getAll, getStats, getUser, updateUser } from "../controllers/user.js";
const router = express.Router();

router.put("/:id",verifyToken,updateUser)
router.delete("/:id",verifyTokenAdmin,deleteUser)
router.get("/stats",verifyTokenAdmin,getStats)
router.get("/:id",verifyToken,getUser)
router.get("/",verifyTokenAdmin,getAll)



export default router
