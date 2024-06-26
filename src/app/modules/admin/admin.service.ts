import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { Admin } from './admin.model'
import { searchableField } from './admin.constant'
import { TAdmin } from './admin.interface'
import httpStatus from 'http-status'
import { AppError } from '../../errors/appError'
import { User } from '../user/user.model'

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

const updateAdminFromDB = async (id: string, playLoad: Partial<TAdmin>) => {
  const { name, ...remainingStudentData } = playLoad

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true, session },
    )

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Admin is not deleted')
    }
    const userId = deletedAdmin.user;

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

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminFromDB,
  deleteAdminFromDB
}
