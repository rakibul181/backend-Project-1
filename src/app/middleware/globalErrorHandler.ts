import { NextFunction, Request, Response } from 'express'
import { TErrorSources } from '../interface/error'
import { ZodError } from 'zod'
import handelZodError from '../errors/handelZodError'
import config from '../config'
import handelValidationError from '../errors/handelValidatorError'
import handelCastError from '../errors/handelCastError'
import handelDuplicateError from '../errors/handelDuplicateError'
import { AppError } from '../errors/appError'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500
  let message = 'Something went wrong'

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (error instanceof ZodError) {
    const simplifiedError = handelZodError(error)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handelValidationError(error)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (error?.name === 'CastError') {
    const simplifiedError = handelCastError(error)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (error?.code === 11000) {
    const simplifiedError = handelDuplicateError(error)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode
    message = error?.message
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ]
  } else if (error instanceof Error) {
    message = error.message
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources: errorSources,
    // error: error,
    stack: config.NODE_env === 'Development' ? error.stack : null,
  })
}

export default globalErrorHandler
