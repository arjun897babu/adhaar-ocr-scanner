import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { HttpStatusCode } from "../utility/enum";
import { CustomError } from "../utility/customError";
import { MulterRequst } from "../utility/types";
import { removeFiles } from "../utility/removeFiles";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filepaths = (req as MulterRequst).imagepath;
  removeFiles(filepaths?.frontImage);
  removeFiles(filepaths?.backImage);
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(HttpStatusCode.CONTENT_TOO_LARGE).json({
        status: "Error",
        message: "file size is too large",
        error: {
          key: err.field,
          message: "please upload image less than 4 mb",
        },
      });
    }
  }
  if (err instanceof CustomError) {
    const error = err.field ? { [err.field]: err.message } : err.err;
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      error,
    });
  }
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "Internal server error",
    error: { common: "Internal server error" },
  });
};
