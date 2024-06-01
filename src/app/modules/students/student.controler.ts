import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentID } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentID)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are gotten successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentID } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentID)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are gotten successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are gotten successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
}
