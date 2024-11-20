import { ErrorObj } from "./types";

export class CustomError extends Error {
  statusCode: number;
  field?: string;
  err?:ErrorObj
  constructor(message: string, statusCode: number, field?: string,err?:ErrorObj) {
    super(message);
    this.field = field;
    this.statusCode = statusCode;
    this.err = err
  }
}
