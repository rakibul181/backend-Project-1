import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { CourseServices } from './course.services'
import sendResponse from '../../utils/sendResponse'

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Course created successfully',
    data: result,
  })
})
const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculty are gotten successfully',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.getSingleCourseByIDFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is found successfully',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.updateCourseIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.deleteCoursesFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty are deleted successfully',
    data: result,
  })
})
const assignFacultyWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body
  const result = await CourseServices.assignFacultyWithCourseIntoDB(
    courseId,
    faculties,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty assign successfully',
    data: result,
  })
})

const removeFacultyWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body
  const result = await CourseServices.removeFacultyWithCourseIntoDB(
    courseId,
    faculties,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty remove successfully',
    data: result,
  })
})

export const courseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourse,
  deleteCourse,
  updateCourse,
  assignFacultyWithCourse,
  removeFacultyWithCourse,
}
