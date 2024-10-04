import Cart from "../models/Cart.js"


export const addCart = async (req, res, next) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId === productId);

            if (productIndex > -1) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.push({ productId, quantity });
            }

            const updatedCart = await cart.save();
            return res.status(200).json(updatedCart);
        } else {
            const newCart = new Cart({ userId, products: [{ productId, quantity }] });
            const savedCart = await newCart.save();
            return res.status(201).json(savedCart);
        }
    } catch (err) {
        next(err);
    }
};




//update Cart
export const updateCart = async (req, res, next) => {
    try{
        const updateCart=await Cart.findByIdAndUpdate(req.params.id,{
           $set:req.body
        },{new:true})
        res.status(200).json(updateCart)
      }catch(err){
        next(err)
      }
  }; 
//delete Cart
  export const deleteCart=async(req,res,next)=>{
    const { userId, productId } = req.params; 
    try {
        // Find the cart by user ID
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product from the cart
        cart.products = cart.products.filter(item => item.productId !== productId);

        // Save the updated cart
        const updatedCart = await cart.save();

        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete product from cart', error: err.message });
    }
   
}

export const resetCart = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json("Cart not found");
        }

        cart.products = []; 
        await cart.save();

        res.status(200).json("Cart has been reset");
    } catch (err) {
        next(err);
    }
}
//get user Carts 

export const getCart=async(req,res,next)=>{
    try{
        const userId=req.params.userId;
        const cart=await Cart.find({userId});
        res.status(200).json(cart)

    }catch(err){
        console.log(err)
        next(err)
    }
}
//get Carts
export const getCarts=async(req,res,next)=>{
    try{
        const Carts=await Cart.find();
        res.status(200).json(Carts)
   }catch(err){
      console.log(err)
   }
  
  }

  
  