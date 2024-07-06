import httpStatus from 'http-status'
import { AppError } from '../../errors/appError'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'
import { TOfferedCourse } from './OfferedCourse.interface'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Faculty } from '../faculty/faculty.model'
import { Course } from '../Course/course.model'
import { OfferedCourse } from './OfferedCourse.model'
import { hasTimeConflict } from './OfferedCourse.utils'
import { RegistrationStatus } from '../semesterRegistration/semesterRegistration.constant'
import QueryBuilder from '../../builder/QueryBuilder'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    days,
    section,
    startTime,
    endTime,
  } = payload

  //check any upcoming or ongoing Object ID can exist in OfferedCourse

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration)
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, ` semester registration Not Exist`)
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester

  const isAcademicFacultyExist = await AcademicFaculty.findById(academicFaculty)
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, `This Academic Faculty Not Exist`)
  }

  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment)
  if (!isAcademicDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This Academic Department Not Exist`,
    )
  }

  const isFacultyExist = await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, `This Faculty Not Exist`)
  }
  const isCourseExist = await Course.findById(course)
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `This Course Not Exist`)
  }

  const isDeptExistToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  })
  if (!isDeptExistToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExist.name} Not Exist on the ${isAcademicFacultyExist.name}`,
    )
  }

  const isSameOfferedCourseInSameSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    })

  if (isSameOfferedCourseInSameSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered Course with same section is already exist`,
    )
  }
  //get the schedule  of faculty
  const assignSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `The Faculty is not assignable to that time , choose another time `,
    )
  }

  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  })
  return result
}

const getOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await offeredCourseQuery.modelQuery
  return result
}

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = OfferedCourse.findById(id)
  return result
}

const updateOfferedCourseOnDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    'days' | 'startTime' | 'endTime' | 'faculty' | 'maxCapacity'
  >,
) => {
  const { faculty, days, startTime, endTime } = payload
  //is offered Course Exist

  const isOfferedCourseExist = await OfferedCourse.findById(id)
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `This Offered Course Not Exist`)
  }

  //check faculty exist
  const isFacultyExist = await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, `This Faculty Not Exist`)
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration
  //get the schedule  of faculty
  const assignSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `The Faculty is not assignable to that time , choose another time `,
    )
  }

  //semester Registration status
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration)

  if (semesterRegistrationStatus?.status !== RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot update semester as it is ${semesterRegistrationStatus?.status} `,
    )
  }

  const result = OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteOfferedCourseFromDB = async (id: string) => {
  const isOfferedCourseExist = await OfferedCourse.findById(id)
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `This Offered Course Not Exist`)
  }
  //semester registration status
  const semesterRegistration = isOfferedCourseExist.semesterRegistration

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration)

  if (semesterRegistrationStatus?.status !== RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot update semester as it is ${semesterRegistrationStatus?.status} `,
    )
  }
  const result = OfferedCourse.findByIdAndDelete(id)
  return result
}
export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseOnDB,
  deleteOfferedCourseFromDB,
}
