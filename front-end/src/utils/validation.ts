import { AxiosError, HttpStatusCode } from "axios";
import { ApiErrorResponse } from "../service/type";

export function isErrorResponse(error:unknown): error is ApiErrorResponse{
    return (
        typeof error=='object'
        &&error!==null
        && 'statusCode' in error
        && typeof error.statusCode==='number'
        &&'message'in error
        &&'status'in error
        &&'error' in error
        && typeof error.error ==='object'
    )
}

export function handleAxiosError(error: unknown): ApiErrorResponse {
 
    if (error instanceof AxiosError) {
      const { response } = error
      if (response) {
        return {
          statusCode: response.status,
          message:response.data.message,
          status:response.data.status,
          error: response.data.error
        } as ApiErrorResponse
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