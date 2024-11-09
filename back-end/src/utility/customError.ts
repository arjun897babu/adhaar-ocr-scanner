export class CustomError extends Error {
  statusCode: number;
  field: string;
  constructor(message: string, statusCode: number, field: string) {
    super(message);
    this.field = field;
    this.statusCode = statusCode;
  }
}
