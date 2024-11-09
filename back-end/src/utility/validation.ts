import path from "path";
import { CustomError } from "./customError";
import { extractDOB,extractGovermentTextBack, extractAdhaarNumber, extractGender } from "./extract-data";

export function validateFiles( file: Express.Multer.File[] | undefined, fileName: "adhaarBackFile" | "adhaarFrontFile") {
  
  const supportedImages = [".bmp", ".jpg", ".png", ".pbm", ".webp"];

  if (!file) {
    throw new CustomError("please upload image", 400, fileName);
  } else if (!supportedImages.includes(path.extname(file[0].path).toLowerCase())) {
    throw new CustomError("unsupported image format", 400, fileName);
  }
  return file;
}

function validateCard(ocrText: string) {
  if (!ocrText.trim()) {
    throw new CustomError("please upload a clear image", 400, "image");
  }
}

export function isAdhaarFront(ocrText: string) {
  validateCard(ocrText);
  if(extractGender(ocrText)===''&&extractDOB(ocrText)===''){
    throw new CustomError("upload a valid adhaar card", 400, "adhaarFrontFile");
  }
  else if(extractDOB(ocrText)==''||extractGender(ocrText)===''){
    throw new CustomError("please upload a clear image", 400, "adhaarFrontFile");
  }
  
}

export function isAdhaarBack(ocrText: string) {
  validateCard(ocrText);
  if(extractGovermentTextBack(ocrText)===''&&extractAdhaarNumber(ocrText)===''){
    throw new CustomError("please upload a clear image", 400, "adhaarBackFile");
  }
  else if(extractGovermentTextBack(ocrText)==''){
    throw new CustomError("upload a valid adhaar card", 400, "adhaarBackFile");
  }
}
