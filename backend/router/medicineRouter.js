import express from "express";
import {
  createMedicine,
  getAllMedicines,
  updateMedicine,
  deleteMedicine,
  getMedicineDetails,
} from "../controller/medicineController.js";
import {
  isAdminAuthenticated
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/medicine", isAdminAuthenticated, createMedicine);
router.get("/", isAdminAuthenticated, getAllMedicines);
router.get("/medicine/:id", isAdminAuthenticated, getMedicineDetails);
router.put("/medicine/:id", isAdminAuthenticated, updateMedicine);
router.delete("/medicine/:id", isAdminAuthenticated, deleteMedicine);

export default router;
