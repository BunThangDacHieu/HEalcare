import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Improved input validation
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorHandler("Invalid email format", 400));
  }

  // Create new message
  const newMessage = await Message.create({ firstName, lastName, email, phone, message });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  // Add pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const messages = await Message.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalMessages = await Message.countDocuments();

  res.status(200).json({
    success: true,
    count: messages.length,
    totalMessages,
    totalPages: Math.ceil(totalMessages / limit),
    currentPage: page,
    messages,
  });
});