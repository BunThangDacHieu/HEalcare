import mongoose from "mongoose";
import validator from "validator";

const medicineSchema = new mongoose.Schema({
  medicinecategoryid: {
    type: Number,
    required: [true, "MedicineCategoryID is required!"],
  },
  prescriptionid: {
    type: Number,
    required: [true, "PrescriptionID is required!"],
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: [3, "Name must contain at least 3 characters!"],
  },
  origin: {
    type: String,
    required: [true, "Origin is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
    validate: {
      validator: (value) => value >= 0,
      message: "Price must be a positive number!",
    },
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required!"],
    validate: {
      validator: (value) => Number.isInteger(value) && value >= 0,
      message: "Quantity must be a non-negative integer!",
    },
  },
  importdate: {
    type: Date,
    required: [true, "ImportDate is required!"],
  },
  expirationdate: {
    type: Date,
    required: [true, "ExpirationDate is required!"],
  },
});

export const Medicine = mongoose.model("Medicine", medicineSchema);
