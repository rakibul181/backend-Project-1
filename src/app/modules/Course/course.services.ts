import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { courseSearchableField } from './course.constant'
import { TCourse } from './course.interface'
import { Course } from './course.model'
import { AppError } from '../../errors/appError'
import httpStatus from 'http-status'

const createCourseIntoDB = async (playLoad: TCourse) => {
  const result = await Course.create(playLoad)
  return result
}
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses'),
    query,
  )
    .search(courseSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await courseQuery.modelQuery
  return result
}
const getSingleCourseByIDFromDB = async (id: string) => {
  const result = await Course.findById(id)
  return result
}

const deleteCoursesFromDB = async (id: string) => {
  const result = Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )

  return result
}

const updateCourseIntoDB = async (id: string, playLoad: Partial<TCourse>) => {
  const { preRequisiteCourses, ...basicsCourseInfo } = playLoad

  const session = await mongoose.startSession()

  try {
    await session.startTransaction()
    const updatedBasicsCourseInfo = await Course.findByIdAndUpdate(
      id,
      basicsCourseInfo,
      {
        new: true,
        runValidators: true,
        session,
      },
    )
    if (!updatedBasicsCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course failed to update')
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const findDeletePreRequisiteCourse = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course)

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: findDeletePreRequisiteCourse },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course failed to update')
      }

      const newPreRequisiteCourse = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      )

      const updatePreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: newPreRequisiteCourse },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )
      if (!updatePreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course failed to update')
      }
      await session.commitTransaction()
      await session.endSession()
      const result = Course.findById(id).populate('preRequisiteCourses')

      return result
    }
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
  }
}
export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseByIDFromDB,
  deleteCoursesFromDB,
  updateCourseIntoDB,
}
