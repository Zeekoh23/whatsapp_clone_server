"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../controllers/imageController");
const imagerouter = express_1.default.Router();
imagerouter.route("/upload").post(imageController_1.upload.array("imgs"), imageController_1.sendImages);
module.exports = imagerouter;
