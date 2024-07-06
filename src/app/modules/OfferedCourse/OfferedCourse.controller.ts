import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { offeredCourseServices } from "./OfferedCourse.services"


const createOfferedCourse = catchAsync(async (req, res) => {
  const result =
    await offeredCourseServices.createOfferedCourseIntoDB(
      req.body,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration created successfully',
    data: result,
  })
})

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result =
    await offeredCourseServices.getOfferedCourseFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is found successfully',
    data: result,
  })
})

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await offeredCourseServices.getSingleOfferedCourseFromDB(
      id,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course  is found successfully',
    data: result,
  })
})

const updateOfferedCourse = catchAsync(async (req, res) => {
   const { id } = req.params
  const result = await offeredCourseServices.updateOfferedCourseOnDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is updated successfully',
    data: result,
  })
})

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await  offeredCourseServices.deleteOfferedCourseFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is delete successfully',
    data: result,
  })
})

export const offeredCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse
   
}
