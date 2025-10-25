import express from "express";
const router=express.Router();


router.get("/signup",function(req,res){
      res.send("Signup endpoint");
})

router.get("/login",function(req,res){
      res.send("Login endpoint");
})

router.get("/logout",function(req,res){
      res.send("Logout endpoint");
})

export default router;