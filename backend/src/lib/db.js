import mongoose, { mongo } from "mongoose";

export const connectDB=async ()=>{
      try{
            const conn=await mongoose.connect(process.env.MONGO_URI);

            console.log("Mongodb connected : ",conn.connection.host);
      }catch(error){
            console.log(error.message);
            process.exit(1);//one means failed and 0 means success
      }

}