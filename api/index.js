import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoute from "./routers/auth.js"
import userRoute from "./routers/user.js"
import productRoute from "./routers/product.js"
import orderRoute from "./routers/order.js"
import cartRoute from "./routers/cart.js"
import favoriteRoute from "./routers/favorite.js"
import catRoute from "./routers/category.js"
import stripeRoute from "./routers/stripe.js"


const app=express();
dotenv.config();

//connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>
console.log("DB connecting ")).catch((err)=>{
  console.log(err)  
})

//middlewares:

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", 
  credentials: true,
};
app.use(cors(corsOptions)); 


app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
app.use("/api/orders",orderRoute)
app.use("/api/cart",cartRoute)
app.use("/api/favorites",favoriteRoute)
app.use("/api/categories",catRoute)
app.use("/api/checkout",stripeRoute)









app.use((err,req,res,next)=>{
  const errorStatus=err.status||500;
  const errorMessage=err.message||"something was wrong!"
  return res.status(errorStatus).send(errorMessage)
})
//connect to server
app.listen(process.env.PORT||8000,()=>{
    console.log("server run on port 8000")
})