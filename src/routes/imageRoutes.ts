import express from "express";

import {
  upload,
  sendImages,
  //uploadImages,
} from "../controllers/imageController";

const imagerouter: any = express.Router();

imagerouter.route("/upload").post(upload.array("imgs"), sendImages);
//imagerouter.route("/upload").post(uploadImages, sendImages);
export = imagerouter;
