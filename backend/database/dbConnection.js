import mongoose from "mongoose";

export const dbConnection = () => {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    throw new Error("Missing MONGO_URI environment variable.");
  }

  mongoose
    .connect(MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.error("Some error occurred while connecting to the database:", err);
    });
};
