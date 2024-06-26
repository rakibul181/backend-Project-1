import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { searchableField } from "./faculty.constant"
import { TFaculty } from "./faculty.interface"
import { Faculty } from "./faculty.model"
import { AppError } from "../../errors/appError"
import httpStatus from "http-status"
import { User } from "../user/user.model"

 

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await facultyQuery.modelQuery

  return result
}

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id)

  return result
}

const updateFacultyFromDB = async (id: string, playLoad: Partial<TFaculty>) => {
  const { name, ...remainingStudentData } = playLoad

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true, session },
    )

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Admin is not deleted')
    }
    const userId = deleteFaculty.user;

    const deleteUser = await User.findOneAndUpdate(
      userId,
      { isDelete: true },
      { new: true, session },
    )
    if (!deleteUser) {
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

export const FacultyServices = {
   getAllFacultyFromDB,
   getSingleFacultyFromDB,
   updateFacultyFromDB,
   deleteFacultyFromDB
}
