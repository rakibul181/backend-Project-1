import { StudentServices } from './student.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentID } = req.params
  const result = await StudentServices.getSingleStudentFromDB(studentID)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are gotten successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const { studentID } = req.params
  const result = await StudentServices.deleteStudentFromDB(studentID)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are gotten successfully',
    data: result,
  })
})

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are gotten successfully',
    data: result,
  })
})


export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
}
