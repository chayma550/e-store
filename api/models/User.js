import mongoose from "mongoose";

let userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,  

      },
      email:{
        type:String,
        unique:true,
        required:true,
        unique: true, 

      },
      password:{
        type:String,
        required:true,
      },
      phone: {
        type: String,
        required: true,
      },
      address:{
        type:String,
        required:true
      },
      avatar:{
        type:String,
        default:"",
      },
      isAdmin:{
        type:Boolean,
        default:false,
    },
    
  
},
{timestamps:true}
)
export default mongoose.model("User",userSchema);