import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudinary_v2 = cloudinary.v2;

cloudinary_v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export = cloudinary_v2;
