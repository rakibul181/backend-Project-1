import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { academicSemesterServices } from './academicSemester.services'

const createAcademicSemester = catchAsync(async (req, res) => {
 

  const result = await  academicSemesterServices.createAcademicSemesterIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  })
})

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ALL Academic Semester are gotten successfully',
    data: result,
  })
})
const getSingleAcademicSemesterByID = catchAsync(async (req, res) => {
  const {id} = req.params
  const result = await academicSemesterServices.getSingleAcademicSemesterByIDFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester are gotten successfully',
    data: result,
  })
})
const updateAcademicSemesterByID = catchAsync(async (req, res) => {
  const {id} = req.params
  const result = await academicSemesterServices.updateAcademicSemesterByIDFromDB(id,req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is Updated successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemesterByID,
  updateAcademicSemesterByID,
}
