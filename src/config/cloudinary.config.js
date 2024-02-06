import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Nơi Config để kết nối tới Cloudinary Server
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary, //Nơi lưu database
  allowedFormats: ["jpg", "png", "mp3", "mp4"], // Được quyền Upload lên những file nào?
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }, // Lấy và lưu lên Server
});

const uploadCloud = multer({ storage });
export default uploadCloud;
