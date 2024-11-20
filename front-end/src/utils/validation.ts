import { AxiosError, HttpStatusCode } from "axios";
import { ApiErrorResponse } from "../service/type";
import { fileType } from "../App";

export function isErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error == "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number" &&
    "message" in error &&
    "status" in error &&
    "error" in error &&
    typeof error.error === "object"
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
    error: {
      key: "unknown_error",
      message: "An unexpected error occurred",
    },
  } as ApiErrorResponse;
}
function extractExtName(fileName: string): string {
  return fileName.match(/\.[^.\s]+$/)?.[0]??'';
}

export function validateFiles(
  file: File,
  fileName: fileType
): { key: fileType; message: string }|null {
  const supportedImages = [".bmp", ".jpg", ".png", ".pbm", ".webp"];
  if (!file) {
    return { key: fileName as fileType, message: "please upload image" };
  } else if (!supportedImages.includes(extractExtName(file.name))) {
    return { key: fileName as fileType, message: "unsupported image format" };
  } else{
    return null
  }
}
