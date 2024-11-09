import express from "express";
import { upload } from "./multer";
import { ocrController } from "../controller/ocr-controller";
const OcrRoute = express.Router();

const multerUploadConfig = [
  { name: "adhaarFrontFile", maxCount: 1 },
  { name: "adhaarBackFile", maxCount: 1 },
];

OcrRoute.post("/ocr", upload.fields(multerUploadConfig), ocrController);

export default OcrRoute