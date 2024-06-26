import { TCourse } from './course.interface'
import { Course } from './course.model'

const createCourseIntoDB = async (playLoad: TCourse) => {
  const result = await Course.create(playLoad)
  return result
}
const getAllCourseFromDB = async () => {
  const result = await Course.find()
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

export const academicFacultyServices = {
   createCourseIntoDB,
   getAllCourseFromDB,
   getSingleCourseByIDFromDB,
   deleteCoursesFromDB
}
