import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: String, 
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  delivery: {
    assignedTo: { type: String , default:"admin"}, 
    deliveryStatus: { type: String, default: "not assigned" }, 
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
