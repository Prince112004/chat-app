// const express=require('express');
import express from "express"
const app=express();
import path, { dirname } from "path";

const __dirname=path.resolve();


import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js";


import dotenv from "dotenv"
dotenv.config();
const PORT=process.env.PORT || 3000;




app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoute)

//make ready for deployment
if(process.env.NODE_ENV==="production"){
      app.use(express.static(path.join(__dirname,"../frontend/dist")));
      app.use((req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
      });

}


//run npmrun start
app.listen(PORT,()=>{
      console.log("Server is running on port : "+ PORT)
})
