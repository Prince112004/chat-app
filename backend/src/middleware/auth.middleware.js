import jwt from "jsonwebtoken";
import Usermodel from "../models/User.js"
import { ENV } from "../lib/env.js";

export const checkAuthenticated=async(req,res,next)=>{
      try{
            const token=req.cookies.jwt;
            if(!token) return res.status(401).json({message:"Unauthorized - No token provided"});
            
            
            const decoded=jwt.verify(token,ENV.JWT_SECRET);
            if(!decoded) return res.status(401).json({message:"Unauthorized - Invalid token"});

            const user=await Usermodel.findById(decoded.userId).select("-password");

            if(!user) return res.status(401).json({message:"User not found"});
            
            req.user=user;
            return next();


      }catch(error){
            console.log("Error in check authenticated middleware");
            res.status(500).json({message:"Internal server error"});
      }

}