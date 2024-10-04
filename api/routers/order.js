import express from "express";
import {   verifyToken, verifyTokenAdmin,} from "../utils/verifyToken.js";
import { addOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../controllers/order.js";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/",verifyToken,addOrder)

router.put("/:id",verifyToken,updateOrder)
router.delete("/:id",verifyToken,deleteOrder)
router.get("/:orderId",verifyToken,getOrder)
router.get("/",verifyTokenAdmin,getOrders)


  router.put("/:id/delivery-status", verifyTokenAdmin, async (req, res) => {
    const { deliveryStatus } = req.body; // e.g., 'completed', 'failed'
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: { "delivery.deliveryStatus": deliveryStatus }
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json({ message: "Failed to update delivery status", error: err.message });
    }
  });
  
  

  router.get("/income",  async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  


  
  
  
  export default router
