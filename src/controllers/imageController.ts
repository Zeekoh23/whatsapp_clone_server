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

export const upload: any = multer({
  storage: multerstorage,
});

export const sendImages = CatchAsync(
  async (req: any, res: Response, next: NextFunction, file: any) => {
    res.json({ path: req.files.filename });
  }
);
