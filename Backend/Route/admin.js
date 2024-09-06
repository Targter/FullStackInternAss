import { Router } from "express";
import {
  getAllUsers,
  scheduleMeetingForUser,
} from "../controllers/admin.controller.js";
const adminrouter = Router();
adminrouter.get("/getallUsers", getAllUsers);

adminrouter.post("/:userId/schedule", scheduleMeetingForUser);

export default adminrouter;
