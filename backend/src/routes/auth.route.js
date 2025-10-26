import express from "express";
import { login, logout, signup,updateProfile } from "../controllers/auth.controller.js";
import {checkAuthenticated} from "../middleware/auth.middleware.js"

const router=express.Router();


router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)
router.post("/update-profile",checkAuthenticated,updateProfile)//protect route for checking if the user is authenticated or not

router.get("/check",checkAuthenticated,(req,res)=> res.status(200).json(req.user));

export default router;