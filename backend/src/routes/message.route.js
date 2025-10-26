import express from "express";
const router=express.Router();
import { getAllContact,getMessageByUserId,sendMessage, getAllPartnerchat } from "../controllers/message.controller.js";
import { checkAuthenticated } from "../middleware/auth.middleware.js";
import {arcjetProtection} from "../middleware/arcjet.middleware.js"

// router.use(arcjetProtection,checkAuthenticated);//use when in production

//use when in development
router.use(checkAuthenticated);


router.get("/contact",getAllContact);
router.get("/chat",getAllPartnerchat);
router.get("/:id",getMessageByUserId);
router.post("/send/:id",checkAuthenticated,sendMessage);

export default router;