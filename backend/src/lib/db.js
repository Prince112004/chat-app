import mongoose, { mongo } from "mongoose";
import { ENV } from "./env.js";
export const connectDB=async ()=>{
      try{
            const conn=await mongoose.connect(ENV.MONGO_URI);

            console.log("Mongodb connected : ",conn.connection.host);
      }catch(error){
            console.log(error.message);
            process.exit(1);//one means failed and 0 means success
      }

}