import express from "express";
import { login, logout, signup,updateProfile } from "../controllers/auth.controller.js";
import {checkAuthenticated} from "../middleware/auth.middleware.js"
import {arcjetProtection} from "../middleware/arcjet.middleware.js"
const router=express.Router();

// router.use(arcjetProtection);

router.get("/test",(req,res)=>{
      return res.status(200).json({message:"Rate limit tested"})
})

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)
router.put("/update-profile",checkAuthenticated,updateProfile)//protect route for checking if the user is authenticated or not

router.get("/check",checkAuthenticated,(req,res)=> res.status(200).json(req.user));

export default router;