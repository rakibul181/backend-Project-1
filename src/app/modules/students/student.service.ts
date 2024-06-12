import mongoose from 'mongoose'
import { Student } from './student.model'
import { AppError } from '../../errors/appError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { TStudent } from './student.interface'

const getAllStudentsFromDB = async (query:Record<string,unknown>) => {

  let searchTerm = '' 

  if(query?.searchTerm){
    searchTerm = query.searchTerm as string
  }
  const result = await Student.find({
    $or:['email','name.firstName','name.middleName','name.lastName','presentAddress'].map((field)=>({
      [field]:{$regex:searchTerm,$options:'i'}
    }))
  })
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

 

  return result
}

const getSingleStudentFromDB = async (studentID: string) => {
  // const result = await Student.findOne({ id: studentID })
  const result = await Student.findOne({ id: studentID })
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  return result
}

const updateStudentFromDB = async (
  studentID: string,
  playLoad: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = playLoad

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate(
    { id: studentID },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}
const deleteStudentFromDB = async (studentID: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const isDeleted = await Student.findByIdAndUpdate(
      { id: studentID },
      { isDelete: true },
      { new: true, session },
    )

    if (!isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student is not deleted')
    }

    const isDeleteUser = await User.findOneAndUpdate(
      { id: studentID },
      { isDelete: true },
      { new: true, session },
    )
    if (!isDeleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is not deleted')
    }
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User does not deleted successfully',
    )
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
}
