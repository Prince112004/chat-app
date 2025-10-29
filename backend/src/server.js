// const express=require('express');
import express from "express"

import path, { dirname } from "path";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser"
import cors from "cors";
import { app, server } from "./lib/socket.js";

const __dirname=path.resolve();
const PORT= ENV.PORT || 3000;
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));


import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js";



import { connectDB } from "./lib/db.js";
app.use(express.json({limit:"5mb"}));
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)

//make ready for deployment
if(ENV.NODE_ENV==="production"){
      app.use(express.static(path.join(__dirname,"../frontend/dist")));
      app.use((req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
      });

}


//run npmrun start
server.listen(PORT,()=>{
      console.log("Server is running on port : "+ PORT);
      connectDB();
})
