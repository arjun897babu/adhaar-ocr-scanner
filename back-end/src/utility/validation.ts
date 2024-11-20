import path from "path";
import { CustomError } from "./customError";
import {
  extractDOB,
  extractGovermentTextBack,
  extractAdhaarNumber,
  extractGender,
} from "./extract-data";
import { ErrorObj, MulterRequst } from "./types";
import { HttpStatusCode } from "./enum";

export function validateFiles(files: MulterRequst["files"] | undefined) {
  let error: ErrorObj = {};
  const supportedImages = [".bmp", ".jpg", ".png", ".pbm", ".webp"];
  for (let fieldname in files) {
    const file = files[fieldname]?.[0];
    if (!file) {
      error[fieldname] = "please upload image";
    } else if (
      !supportedImages.includes(path.extname(file.path).toLowerCase())
    ) {
      error[fieldname] = "unsupported image format";
    }
  }

  if (Object.keys(error).length > 0) {
    throw new CustomError(
      "file error",
      HttpStatusCode.BAD_REQUEST,
      undefined,
      error
    );
  }
}

function validateCard(ocrText: string) {
  if (!ocrText.trim()) {
    throw new CustomError("please upload a clear image", 400, "image");
  }
}

function isAdhaarFront(
  ocrText: string,
  error: ErrorObj
) {
  try {
    validateCard(ocrText);
    if (extractGender(ocrText) === "" && extractDOB(ocrText) === "") {
      error["adhaarFrontFile"] = "upload a valid adhaar card";
    } else if (extractDOB(ocrText) == "" || extractGender(ocrText) === "") {
      error["adhaarFrontFile"] = "please upload a clear image";
    }
  } catch (err) {
    if (err instanceof CustomError) {
      error["adhaarFrontFile"] = err.message;
    }
  }
}

function isAdhaarBack(ocrText: string, error: ErrorObj) {
  try {
    validateCard(ocrText);
    if (
      extractGovermentTextBack(ocrText) === "" &&
      extractAdhaarNumber(ocrText) === ""
    ) {
      error["adhaarBackFile"] = "please upload a clear image";
    } else if (extractGovermentTextBack(ocrText) == "") {
      error["adhaarBackFile"] = "upload a valid adhaar card";
    }
  } catch (err) {
    if (err instanceof CustomError) {
      error["adhaarFrontFile"] = err.message;
    }
  }
}

export function isAdhaar(ocrText1: string, ocrText2: string) {
  let error: ErrorObj = {};

  isAdhaarFront(ocrText1, error);
  isAdhaarBack(ocrText2, error);

  if (Object.keys(error).length > 0) {
    throw new CustomError(
      "adhaar error",
      HttpStatusCode.BAD_REQUEST,
      undefined,
      error
    );
  }
}
