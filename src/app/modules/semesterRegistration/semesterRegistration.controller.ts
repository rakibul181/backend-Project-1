import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { semesterRegistrationServices } from './semesterRegistration.services'

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration created successfully',
    data: result,
  })
})

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getSemesterRegistrationFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registered Semester is found successfully',
    data: result,
  })
})

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationByIdFromDB(
      id,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registered semester is found successfully',
    data: result,
  })
})

// const updateFaculty = catchAsync(async (req, res) => {
//   const { faculty } = req.body
//   const { id } = req.params
//   const result = await FacultyServices.updateFacultyFromDB(id, faculty)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty is updated successfully',
//     data: result,
//   })
// })

// const deleteFaculty = catchAsync(async (req, res) => {
//   const { id } = req.params
//   const result = await  FacultyServices.deleteFacultyFromDB(id)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty are delete successfully',
//     data: result,
//   })
// })

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
}
