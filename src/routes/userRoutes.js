import express from "express";
import {
  deleteCreatedImage,
  getListCreatedImage,
  getListSaveImage,
  getUserInformation,
  postImageUser,
  putUserInformation,
} from "../controllers/userController.js";
import { keyAPI } from "../config/jwt.js";

const userRoutes = express.Router();

userRoutes.get("/get-information-user", keyAPI, getUserInformation);
userRoutes.get("/get-list-saveImage", keyAPI, getListSaveImage);
userRoutes.get(
  "/get-list-createdImage/:nguoi_dung_id",
  keyAPI,
  getListCreatedImage
);
userRoutes.delete("/delete-created-image/:hinh_id", keyAPI, deleteCreatedImage);
userRoutes.post("/post-image-user", keyAPI, postImageUser);
userRoutes.put(
  "/put-information-user/:nguoi_dung_id",
  keyAPI,
  putUserInformation
);

export default userRoutes;
