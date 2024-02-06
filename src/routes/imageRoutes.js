import express from "express";
import {
  getCommentInformation,
  getImageInformation,
  getInformationSaveImage,
  getListImage,
  getListImageByName,
  postInformationComment,
} from "../controllers/imageController.js";
import { keyAPI } from "../config/jwt.js";

const imageRoutes = express.Router();

imageRoutes.get("/get-list-image", getListImage);
imageRoutes.get("/get-list-image/:ten_hinh", getListImageByName);
imageRoutes.get("/get-information-image/:hinh_id", getImageInformation);
imageRoutes.get("/get-information-comment/:hinh_id", getCommentInformation);
imageRoutes.get("/get-information-saveImage/:hinh_id", getInformationSaveImage);
imageRoutes.post("/post-information-comment", keyAPI, postInformationComment);

export default imageRoutes;
