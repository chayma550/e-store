import Order from "../models/Order.js"

//add Order
export const addOrder = async (req, res, next) => {
  try {
      const { userId, products, amount, address, status } = req.body;

      // Check if an order with the same details already exists
      const existingOrder = await Order.findOne({
          userId,
          products: { $elemMatch: { $in: products } }, // Ensure this matches your order structure
          amount,
          address,
          status,
      });

      if (existingOrder) {
          return res.status(400).send('Order already exists');
      }

      // Create a new order if it does not exist
      const newOrder = new Order({
          userId,
          products,
          amount,
          address,
          status,
      });

      const savedOrder = await newOrder.save();


      res.status(201).send(savedOrder);
  } catch (err) {
      console.error('Failed to create order:', err);
      res.status(500).send('Server error');
  }
};


//update Order
export const updateOrder = async (req, res, next) => {
    try{
        const updateOrder=await Order.findByIdAndUpdate(req.params.id,{
           $set:req.body
        },{new:true})
        res.status(200).json(updateOrder)
      }catch(err){
        next(err)
      }
  }; 
//delete Order
  export const deleteOrder=async(req,res,next)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted!!")

    }catch(err){
        res.status(500).json(err)
        next(err)


    }
}
//get user Orders 

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
//get Orders
export const getOrders=async(req,res,next)=>{
    try{
        const orders=await Order.find();
        res.status(200).json(orders)
   }catch(err){
      console.log(err)
   }
  
  }


  
  
  
  