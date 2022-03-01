"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendImages = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const multerstorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ".jpg");
    },
});
/*const multerstorage = multer.memoryStorage();

const multerFilter: any = (
  req: Request,
  res: Response,
  next: NextFunction,
  file: any,
  cb: any
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new ErrorHandling("Not an image, please upload the right image", 400),
      false
    );
  }
};*/
exports.upload = (0, multer_1.default)({
    storage: multerstorage,
    //fileFilter: multerFilter,
});
//export const uploadImages = upload.fields([{ name: "images", maxCount: 5 }]);
exports.sendImages = (0, CatchAsync_1.default)((req, res, next, file) => __awaiter(void 0, void 0, void 0, function* () {
    // try
    //req.files.images = Date.now() + ".jpg";
    res.json({ path: req.files.filename });
    //
    /*} catch (e) {
      return res.json({ error: e });
    }*/
}));
