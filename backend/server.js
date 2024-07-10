import app from "./app.js";
import cloudinary from "cloudinary";

// Check if the necessary environment variables are set
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, PORT } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error("Missing Cloudinary configuration environment variables.");
}

if (!PORT) {
  throw new Error("Missing PORT environment variable.");
}

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  message: 'CLOUDINARY_SUCCESSFUL',
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
