import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { FacultyServices } from "./faculty.service"

 

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultyFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculty are gotten successfully',
    data: result,
  })
})

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await  FacultyServices.getSingleFacultyFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is found successfully',
    data: result,
  })
})


const updateFaculty = catchAsync(async (req, res) => {
  const { faculty } = req.body
  const { id } = req.params
  const result = await FacultyServices.updateFacultyFromDB(id, faculty)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated successfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await  FacultyServices.deleteFacultyFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty are delete successfully',
    data: result,
  })
})

export const facultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty
}
