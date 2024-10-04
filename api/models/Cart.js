import mongoose from "mongoose";

let cartSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[
        {
            productId:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                rquired:true
            },
          

        }        
    ],
 

  
},
{timestamps:true}
)
export default mongoose.model("Cart",cartSchema);