import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body

    // const {error} = joiStudentValidationSchema.validate(studentData)
    // will call service function to send this data into db

    //   const zodParse = zodStudentValidationSchema.parse(studentData)

    const result = await UserService.createStudentIntoDB(password, studentData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UsersControllers = {
  createStudent,
}
