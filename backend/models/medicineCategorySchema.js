import mongoose from "mongoose";

const medicineCategorySchema = new mongoose.Schema({
  medicinecategoryid: {
    type: Number,
    required: [true, "MedicineCategoryID is required!"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: [3, "Name must contain at least 3 characters!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: [10, "Description must contain at least 10 characters!"],
  },
});

export const MedicineCategory = mongoose.model("MedicineCategory", medicineCategorySchema);
