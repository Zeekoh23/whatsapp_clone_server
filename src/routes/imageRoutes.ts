import express from "express";

import { upload, sendImages } from "../controllers/imageController";

const imagerouter: any = express.Router();

imagerouter.route("/upload").post(upload.array("imgs"), sendImages);

export = imagerouter;
