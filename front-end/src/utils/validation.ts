import { AxiosError, HttpStatusCode } from "axios";
import { ApiErrorResponse } from "../service/type";
import { ErrorObj, FileType } from "../App";

export function isErrorObj(obj: unknown): obj is ErrorObj {
  const validKeys:FileType[] = ['adhaarBackFile','adhaarFrontFile','common']
  return (
    typeof obj === "object" &&
    obj !== null &&
    Object.keys(obj).some((key) => validKeys.includes(key as FileType))
  );
 }

export function isErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error == "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number" &&
    "message" in error &&
    "status" in error &&
    "error" in error && isErrorObj(error.error)
  );
}

export function handleAxiosError(error: unknown): ApiErrorResponse {
  if (error instanceof AxiosError) {
    const { response } = error;
    if (response) {
      return {
        statusCode: response.status,
        message: response.data.message,
        status: response.data.status,
        error: response.data.error,
      } as ApiErrorResponse;
    }
  }

  return {
    statusCode: HttpStatusCode.InternalServerError,
    status: "error",
    message: "Something went wrong",
    error: {'common':'An unexpected error occurred'},
  } as ApiErrorResponse;
}
function extractExtName(fileName: string): string {
  return fileName.match(/\.[^.\s]+$/)?.[0]??'';
}

export function validateFiles(
  file: File,
  fileName: FileType
): ErrorObj|null {
  const supportedImages = [".bmp", ".jpg", ".png", ".pbm", ".webp"];
  if (!file) {
    return { [fileName]: "please upload image" } as ErrorObj ;
  } else if (!supportedImages.includes(extractExtName(file.name))) {
    return { [fileName]: "unsupported image format" } as ErrorObj;
  } else{
    return null
  }
}
