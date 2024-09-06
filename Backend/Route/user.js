// Route file: Route/user.js
import { Router } from "express";
import {
  addAvailabilitySlot,
  deleteAvailability,
  getAvailability,
  loginUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/login", loginUser);

router.get("/:userId/availability", getAvailability);
router.post("/:userId/availability", addAvailabilitySlot);
// router.put("/availability/:userId", updateAvailability);

router.delete("/:userId/availability/:slotId", deleteAvailability);
export default router;
