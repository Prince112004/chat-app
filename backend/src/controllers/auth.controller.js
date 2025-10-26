import Usermodel from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";




export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Usermodel({
      fullName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT and set cookie
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profile: newUser.profilePic || null
    });

    //sending the email
    try{
      await sendWelcomeEmail(newUser.email,newUser.fullName,ENV.CLIENT_URL);
    }catch(err){
      console.log({
        message:"Failed to send the welcome Email",
        error:err.message
      });
    }


  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login=async function(req,res){
      const {email,password}=req.body;
      try{
        if(!email || ! password){
          return res.status(400).json({message:"All fields required"});
        }

        const user=await Usermodel.findOne({email});
        if(!user){
           return res.status(400).json({message:"Invalid Credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
          return res.status(400).json({message:"Invalid Credentials"});
        }

        generateToken(user._id,res);
        res.status(200).json({
          message:"Logged in successfully",
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profile: user.profilePic || null
        });


      }catch(error){
        console.log("Error in login controller");
        res.status(500).json({message:"Internal server error"})

      }

}

export const logout=async function(req,res){
      res.cookie("jwt","",{maxAge:0});
      res.status(200).json({message:"Logged Out Successfully !!"})
}