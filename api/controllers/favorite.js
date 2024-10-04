import Favorite from "../models/Favorite.js";

export const addFavorite =async(req,res,next)=>{
    try{
        const{userId,productId}=req.body;
        const existingFavorite=await Favorite.findOne({userId,productId});
        if(existingFavorite){
            return res.status(400).json('Product is already in favorites' );
        }
        const newFavorite=new Favorite({userId,productId});
        await newFavorite.save();
        res.status(201).json(newFavorite)

    }catch(err){
        next(err)
        console.log(err)
    }
}
export const getFavorites =async(req,res,next)=>{
    try{
        const userId=req.params.userId;
        const favorites=await Favorite.find({userId}).populate('productId');;
        res.status(200).json(favorites)

    }catch(err){
        console.log(err)
        next(err)
    }
   
}
export const deleteFavorites = async (req, res, next) => {
    try {
        const { userId, productId } = req.params; 
        if (!userId || !productId) {
            return res.status(400).json("userId and productId are required");
        }
        const result = await Favorite.findOneAndDelete({ userId, productId });
        if (!result) {
            return res.status(404).json("Product not found in favorites!");
        }
        res.status(200).json("Product removed from favorites");
    } catch (err) {
        console.log(err);
        next(err);
    }
};
