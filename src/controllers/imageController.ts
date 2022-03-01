import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import CatchAsync from "../utils/CatchAsync";
import { ErrorHandling } from "../utils/ErrorHandling";

const multerstorage: any = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "./uploads");
  },
  filename: (req: any, file: any, cb: any) => {
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

export const upload: any = multer({
  storage: multerstorage,
  //fileFilter: multerFilter,
});

//export const uploadImages = upload.fields([{ name: "images", maxCount: 5 }]);

export const sendImages = CatchAsync(
  async (req: any, res: Response, next: NextFunction, file: any) => {
    // try
    //req.files.images = Date.now() + ".jpg";
    res.json({ path: req.files.filename });
    //
    /*} catch (e) {
      return res.json({ error: e });
    }*/
  }
);
