import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // const validExts = [".png", ".jpg"];
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(Error("invalid image file!"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export = upload;
