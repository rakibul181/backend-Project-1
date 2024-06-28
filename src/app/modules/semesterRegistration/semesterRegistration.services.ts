import httpStatus from 'http-status'
import { AppError } from '../../errors/appError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'
import QueryBuilder from '../../builder/QueryBuilder'

const createSemesterRegistrationIntoDB = async (
  plyLoad: TSemesterRegistration,
) => {
  const academicSemester = plyLoad?.academicSemester

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester)

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "academicSemester doesn't exists",
    )
  }

  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  })

  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This academic semester already registered',
    )
  }

  const result = SemesterRegistration.create(plyLoad)
  return result
}

const getSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistrationQuery.modelQuery
  return result
}
const getSingleSemesterRegistrationByIdFromDB = async (id:string) => {
 const result = SemesterRegistration.findById(id).populate("academicSemester")
 return result
}
// const CreateSemesterRegistrationIntoDB = async () => {}

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getSemesterRegistrationFromDB,
  getSingleSemesterRegistrationByIdFromDB,
}
