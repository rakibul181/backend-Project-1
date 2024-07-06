import httpStatus from 'http-status'
import { AppError } from '../../errors/appError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegistrationStatus } from './semesterRegistration.constant'
import mongoose from 'mongoose'
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model'

const createSemesterRegistrationIntoDB = async (
  plyLoad: TSemesterRegistration,
) => {
  const academicSemester = plyLoad?.academicSemester

  //check any upcoming or ongoing registered semester
  const isAnyUpcomingOrOngoingRegisteredSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    })

  if (isAnyUpcomingOrOngoingRegisteredSemester) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      `"There is already an ${isAnyUpcomingOrOngoingRegisteredSemester?.status}  registered semester !"` as string,
    )
  }

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  // const isThereAnyUpcomingOrOngoingSEmester =
  //   await SemesterRegistration.findOne({
  //     $or: [
  //       { status: RegistrationStatus.UPCOMING },
  //       { status: RegistrationStatus.ONGOING },
  //     ],
  //   });

  // if (isThereAnyUpcomingOrOngoingSEmester) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
  //   );
  // }

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
const getSingleSemesterRegistrationByIdFromDB = async (id: string) => {
  const result = SemesterRegistration.findById(id).populate('academicSemester')
  return result
}
const updateSemesterRegistrationOnDB = async (
  id: string,
  plyLoad: Partial<TSemesterRegistration>,
) => {
  //is exist semesterRegistration

  const isSemesterRegistrationExist = await SemesterRegistration.findById(id)

  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This academic semester not Found',
    )
  }

  //check if semesterRegistration is Ended?

  const currentRegisteredSemester = isSemesterRegistrationExist?.status
  const requestedRegisteredSemester = plyLoad?.status

  if (currentRegisteredSemester === RegistrationStatus.ENDED) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Semester is already ENDED')
  }

  if (
    currentRegisteredSemester === RegistrationStatus.UPCOMING &&
    requestedRegisteredSemester === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      `You can not update ${currentRegisteredSemester} to ${requestedRegisteredSemester}`,
    )
  }
  if (
    currentRegisteredSemester === RegistrationStatus.ONGOING &&
    requestedRegisteredSemester === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      `You can not update ${currentRegisteredSemester} to ${requestedRegisteredSemester}`,
    )
  }

  const result = SemesterRegistration.findByIdAndUpdate(id, plyLoad, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteSemesterRegistrationFromDb = async (id: string) => {
  //find semester from db
  //check semester status
  //delete offered course on this semester
  //delete semester

  const isSemesterRegistrationExist = await SemesterRegistration.findById(id)

  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This academic semester not Found',
    )
  }

  if (isSemesterRegistrationExist?.status !== RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you Can not delete a ${isSemesterRegistrationExist.status} semester `,
    )
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deleteOfferCourses = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    )

    if (!deleteOfferCourses) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      )
    }
    const deletedSemisterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      })

    if (!deletedSemisterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      )
    }

    await session.commitTransaction()
    await session.endSession()
    return null
  } catch (error:any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getSemesterRegistrationFromDB,
  getSingleSemesterRegistrationByIdFromDB,
  updateSemesterRegistrationOnDB,
  deleteSemesterRegistrationFromDb
}
