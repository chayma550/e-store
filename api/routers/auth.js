import express from "express";
import { login, logout, register } from "../controllers/auth.js";
import passport from "passport";
const router = express.Router();
const bodyParser=express.urlencoded({extended:true});
//register
router.post("/register",register,bodyParser)
//login
router.post("/login",login,bodyParser)
//logout
router.post("/logout", logout)


router.get("/login/success", (req, res) => {
    console.log("User object:", req.user); // Log the user object

    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
          cookies: req.cookies
      });
    }
  });
router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:"http://localhost:3000" ,
    failureRedirect: "/login/failed",
  })
);
export default router