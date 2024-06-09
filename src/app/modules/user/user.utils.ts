import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const findLastStudentID = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (playLoad: TAcademicSemester) => {
  let currentID = (0).toString()
  const lastStudent = await findLastStudentID()

  const lastStudentSemesterCode = lastStudent?.substring(4, 6)
  const lastStudentSemesterYear = lastStudent?.substring(0, 4)
  const currentSeamsterCode = playLoad.code
  const currentSeamsterYear = playLoad.year

  if (
    lastStudent &&
    lastStudentSemesterCode === currentSeamsterCode &&
    lastStudentSemesterYear === currentSeamsterYear
  ) {
    currentID = lastStudent?.substring(0,6)
  }



  const incrementID = (Number(currentID) + 1).toString().padStart(4, '0')
  const studentID = `${playLoad.year}${playLoad.code}${incrementID}`
  return studentID
}
