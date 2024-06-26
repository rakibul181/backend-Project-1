import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { Admin } from './admin.model'
import { searchableField } from './admin.constant'

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminQuery.modelQuery

  return result
}

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id)

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

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
}
