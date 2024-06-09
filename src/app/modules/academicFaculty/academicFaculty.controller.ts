import catchAsync from '../../utils/catchAsync'
import { academicFacultyServices } from './academicFaculty.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  })
})
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " ALL Academic faculty's is get successfully",
    data: result,
  })
})
const getAcademicFacultyByID = catchAsync(async (req, res) => {
  const { facultyID } = req.params
  const result =
    await academicFacultyServices.getAcademicFacultyByIDFromDB(facultyID)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is get successfully',
    data: result,
  })
})
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyID } = req.params
  const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
    facultyID,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is Updated successfully',
    data: result,
  })
})

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFacultyByID,
  updateAcademicFaculty,
}
