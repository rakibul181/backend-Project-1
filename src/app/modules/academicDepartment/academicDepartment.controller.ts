import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { academicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created successfully',
    data: result,
  })
})
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await  academicDepartmentServices.getAllAcademicDepartmentFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " All Academic Department is get successfully",
    data: result,
  })
})
const getAcademicDepartmentByID = catchAsync(async (req, res) => {
  const {  departmentID } = req.params
  const result =
    await academicDepartmentServices.getAcademicDepartmentByIDFromDB(departmentID)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is get successfully',
    data: result,
  })
})
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentID } = req.params
  const result = await academicDepartmentServices.updateAcademicDepartmentIntoDB(
    departmentID,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is Updated successfully',
    data: result,
  })
})

export const academicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartmentByID,
  getAllAcademicDepartment,
  updateAcademicDepartment
}
