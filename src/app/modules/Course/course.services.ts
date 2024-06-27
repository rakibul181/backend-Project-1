import QueryBuilder from '../../builder/QueryBuilder'
import { courseSearchableField } from './course.constant'
import { TCourse } from './course.interface'
import { Course } from './course.model'

const createCourseIntoDB = async (playLoad: TCourse) => {
  const result = await Course.create(playLoad)
  return result
}
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses'), query)
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

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseByIDFromDB,
  deleteCoursesFromDB,
}
