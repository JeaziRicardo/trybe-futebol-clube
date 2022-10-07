import { NextFunction, Request, Response } from 'express';
import CustomError from '../erros/customErros';

export default function errorMiddleware(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  return res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
}
