import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'

const getSingleStudent: RequestHandler = async (req, res, next) => {
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
const deleteStudent: RequestHandler = async (req, res, next) => {
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
const getAllStudent: RequestHandler = async (req, res, next) => {
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
