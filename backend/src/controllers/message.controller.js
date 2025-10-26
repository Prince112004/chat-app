import cloudinary from "../lib/cloudinary.js";
import messageModel from "../models/Message.js";
import userModel from "../models/User.js";


export const getAllContact = async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    // Find all users except the logged-in one
    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedUserId } })
      .select("-password")
      .sort({ fullname: 1 }); 
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.error("Error in getting all contacts:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getMessageByUserId=async (req,res)=>{
  try {
    const myID=req.user._id;
    const {id:otherPersonId}=req.params;
    const messages=await messageModel.find({//there are two possible cases  
      $or :[
        { senderId: myID , receiverId: otherPersonId },//----either i send the message to other person
        { senderId: otherPersonId , receiverId : myID},//----or the other person send me some message
      ]
    })
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getting the chats of the user");
    res.status(500).json({error: "internal Server error"});
  }
}


export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    if (!text && !image) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    if(senderId === receiverId){
      return res.status(400).json({ message: "Cannot send message to yourself" });
    }

    let imageUrl;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sending message:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getAllPartnerchat = async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    // Step 1: Fetch only sender/receiver fields for this user's messages
    const messages = await messageModel
      .find(
        {
          $or: [{ senderId: loggedUserId }, { receiverId: loggedUserId }],
        },
        "senderId receiverId"
      )
      .lean();

    // Step 2: Extract unique chat partner IDs
    const chatPartnerIds = [
      ...new Set(
        messages
          .map((msg) => {
            if (!msg.senderId || !msg.receiverId) return null;
            return msg.senderId.toString() === loggedUserId.toString()
              ? msg.receiverId.toString()
              : msg.senderId.toString();
          })
          .filter(Boolean)
      ),
    ];

    // Step 3: If user has no chat partners
    if (chatPartnerIds.length === 0) {
      return res.status(200).json([]);
    }

    // Step 4: Fetch partner user details
    const chatPartners = await userModel
      .find({ _id: { $in: chatPartnerIds } })
      .select("-password")
      .lean();

    // Step 5: Return the result
    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in fetching chat partners:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
