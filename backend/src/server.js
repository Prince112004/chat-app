// const express=require('express');
import express from "express"
const app=express();

import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js";


import dotenv from "dotenv"
dotenv.config();
const PORT=process.env.PORT || 3000;




app.get("/",function(req,res){
      res.send("Hello How are you")
})

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoute)



app.listen(PORT,()=>{
      console.log("Server is running on port : "+ PORT)
})
