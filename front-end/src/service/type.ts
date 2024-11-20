import { ErrorObj } from "../App";
import { OCRData } from "../pages/ocr-result/types";

export interface ApiResponse {
  status: "success";
  message: string;
  data: OCRData;
}

export interface ApiErrorResponse {
  status: "error";
  message: string;
  statusCode: number;
  error: ErrorObj;
}
