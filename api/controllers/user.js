import User from "../models/User.js"
import CryptoJS from "crypto-js";
//update user
export const updateUser = async (req, res, next) => {
    if (req.body.password) {
      try {
        const encryptedPassword = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
        req.body.password = encryptedPassword;
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  }; 
//delete user
  export const deleteUser=async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("account deleted!!")

    }catch(err){
        res.status(500).json(err)
        next(err)


    }
}
//get user
export const getUser=async(req,res,next)=>{
  try{
      const user=await User.findById(req.params.id)
      res.status(200).json(user)

  }catch(err){
      next(err)
  }
}

//get all users
export const getAll=async(req,res,next)=>{
  try{
      const users=await User.find();
      res.status(200).json(users)
 }catch(err){
    console.log(err)
 }

}

//get users stats
export const getStats=async(req,res,next)=>{
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
}
