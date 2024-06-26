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

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.getSingleAdminFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin are gotten successfully',
    data: result,
  })
})


const updateAdmin = catchAsync(async (req, res) => {
  const { admin } = req.body
  const { id } = req.params
  const result = await AdminServices.updateAdminFromDB(id, admin)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
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

export const adminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin
}
