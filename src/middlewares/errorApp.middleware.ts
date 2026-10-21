export class ErrorApp extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.name = "ErrorApp";

    Error.captureStackTrace?.(this, this.constructor);
  }
}
