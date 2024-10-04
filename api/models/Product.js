import mongoose from "mongoose";

let productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true,  

      },
      desc:{
        type:String,
        unique:true,
        required:true,

      },
      size:{
        type:Array,
      },
      color: {
        type: Array,
      },
      categories: [{
        category: {
            type: String, // Store category name as a string
            required: true,
        },
        subCategories: [String] // An array of subcategory names
    }],
      
      images:{
        type:Array,
      },
      oldPrice:{
        type:Number,

      },
      price:{
        type:Number,
        required:true
    },
    inStock:{
      type:Boolean,
      default:true
    }
    
  
},
{timestamps:true}
)
export default mongoose.model("Product",productSchema);