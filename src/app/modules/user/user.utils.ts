import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'
//student
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
//faculty
export const findLastFacultyID = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastFaculty?.id ? lastFaculty.id : undefined
}

export const generateFacultyId = async () => {
  let  currentID = (0).toString()
  const lastFacultyID = await findLastFacultyID()

 
  if (
    lastFacultyID) {
    currentID = lastFacultyID?.substring(2)
  }



  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0')
  incrementID = `F-${incrementID}`
  return incrementID
}
//admin
export const findLastAdminID = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastAdmin?.id ? lastAdmin.id : undefined
}

export const generateAdminId = async () => {
  let currentID = (0).toString()
  const lastAdminID = await findLastAdminID()

 
  if (
    lastAdminID) {
    currentID = lastAdminID?.substring(2)
  }



  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0')
  incrementID = `A-${incrementID}`
  return incrementID
}
