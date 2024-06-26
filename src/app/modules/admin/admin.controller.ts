import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { AdminServices } from './admin.service'
 

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Admin are gotten successfully',
    data: result,
  })
})

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
const updateStudent = catchAsync(async (req, res) => {
  const { student } = req.body
  const { studentID } = req.params
  const result = await StudentServices.updateStudentFromDB(studentID, student)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  })
})



export const adminControllers = {
  getAllAdmin,
}
