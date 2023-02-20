// import { Request, Response } from "express";

// export const error_handler = (err: BaseError, req: Request, res: Response) => {
//   const status = err.statusCode || 500;
//   const message = err.description || "Something went wrong !";

//   res.status(status).json({
//     status: false,
//     result: message,
//   });
// };

class BaseError extends Error {
  name: string;
  statusCode: number;
  description: string;

  constructor(name: string, statusCode: number, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;

    Error.captureStackTrace(this);
  }
}

export class ApiError extends BaseError {
  constructor(name: string, statusCode: number, description: string) {
    super(name, statusCode, description);
  }
}
