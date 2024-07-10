import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Medicine } from "../models/medicineSchema.js";

export const createMedicine = catchAsyncErrors(async (req, res, next) => {
  const {
    medicineid,
    medicinecategoryid,
    prescriptionid,
    name,
    origin,
    price,
    quantity,
    importdate,
    expirationdate,
  } = req.body;

  if (
    !medicineid ||
    !medicinecategoryid ||
    !prescriptionid ||
    !name ||
    !origin ||
    !price ||
    !quantity ||
    !importdate ||
    !expirationdate
  ) {
    return next(new ErrorHandler("Please fill all fields!", 400));
  }

  const medicine = await Medicine.create({
    medicineid,
    medicinecategoryid,
    prescriptionid,
    name,
    origin,
    price,
    quantity,
    importdate,
    expirationdate,
  });

  res.status(200).json({
    success: true,
    medicine,
    message: "Medicine created successfully!",
  });
});

export const getAllMedicines = catchAsyncErrors(async (req, res, next) => {
  const medicines = await Medicine.find();
  res.status(200).json({
    success: true,
    medicines,
  });
});

export const updateMedicine = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let medicine = await Medicine.findById(id);
  if (!medicine) {
    return next(new ErrorHandler("Medicine not found!", 404));
  }

  medicine = await Medicine.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    medicine,
    message: "Medicine updated successfully!",
  });
});

export const deleteMedicine = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const medicine = await Medicine.findById(id);
  if (!medicine) {
    return next(new ErrorHandler("Medicine not found!", 404));
  }

  await medicine.deleteOne();
  res.status(200).json({
    success: true,
    message: "Medicine deleted successfully!",
  });
});

export const getMedicineDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const medicine = await Medicine.findById(id);
  if (!medicine) {
    return next(new ErrorHandler("Medicine not found!", 404));
  }

  const today = new Date();
  const expirationDate = new Date(medicine.expirationdate);
  const oneMonthFromToday = new Date(today);
  oneMonthFromToday.setMonth(today.getMonth() + 1);

  let message = "Medicine details fetched successfully!";
  if (expirationDate <= oneMonthFromToday) {
    message = "Warning: This medicine is close to its expiration date!";
  }

  res.status(200).json({
    success: true,
    medicine,
    message,
  });
});

export const getExpiredMedicines = catchAsyncErrors(async (req, res, next) => {
  const today = new Date();
  const expiredMedicines = await Medicine.find({
    expirationdate: { $lte: today }
  });

  res.status(200).json({
    success: true,
    medicines: expiredMedicines,
    message: "Expired medicines fetched successfully!"
  });
});
