import { NextFunction, Request, Response } from 'express'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(500).json({
    success: false,
    message: error.message || 'Something went wrong',
    error: error,
  })
}

export default globalErrorHandler
