import httpStatus from 'http-status'
import { AppError } from '../../errors/appError'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'
import { TOfferedCourse } from './OfferedCourse.interface'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Faculty } from '../faculty/faculty.model'
import { Course } from '../Course/course.model'
import { OfferedCourse } from './OfferedCourse.model'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload

  //check any upcoming or ongoing Object ID can exist in OfferedCourse

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration)
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, ` semester registration Not Exist`)
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;

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

 
  const isFacultyExist =  await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This Faculty Not Exist`,
    )
  }
  const isCourseExist =  await Course.findById(course)
  if (!isCourseExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This Course Not Exist`,
    )
  }

   


  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });
  return result;
}

// const getSemesterRegistrationFromDB = async (
//   query: Record<string, unknown>,
// ) => {
//   const semesterRegistrationQuery = new QueryBuilder(
//     SemesterRegistration.find().populate('academicSemester'),
//     query,
//   )
//     .filter()
//     .sort()
//     .paginate()
//     .fields()

//   const result = await semesterRegistrationQuery.modelQuery
//   return result
// }
// const getSingleSemesterRegistrationByIdFromDB = async (id: string) => {
//   const result = SemesterRegistration.findById(id).populate('academicSemester')
//   return result
// }
// const updateSemesterRegistrationOnDB = async (
//   id: string,
//   plyLoad: Partial<TSemesterRegistration>,
// ) => {
//   //is exist semesterRegistration

//   const isSemesterRegistrationExist = await SemesterRegistration.findById(id)

//   if (!isSemesterRegistrationExist) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       'This academic semester not Found',
//     )
//   }

//   //check if semesterRegistration is Ended?

//   const currentRegisteredSemester = isSemesterRegistrationExist?.status
//   const requestedRegisteredSemester = plyLoad?.status

//   if (currentRegisteredSemester === RegistrationStatus.ENDED) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'This Semester is already ENDED')
//   }

//   if (
//     currentRegisteredSemester === RegistrationStatus.UPCOMING &&
//     requestedRegisteredSemester ===RegistrationStatus.ENDED
//   ) {
//     throw new AppError(
//       httpStatus.SERVICE_UNAVAILABLE,
//       `You can not update ${currentRegisteredSemester} to ${requestedRegisteredSemester}`,
//     )
//   }
//   if (
//     currentRegisteredSemester === RegistrationStatus.ONGOING &&
//     requestedRegisteredSemester === RegistrationStatus.UPCOMING
//   ) {
//     throw new AppError(
//       httpStatus.SERVICE_UNAVAILABLE,
//       `You can not update ${currentRegisteredSemester} to ${requestedRegisteredSemester}`,
//     )
//   }

//   const result = SemesterRegistration.findByIdAndUpdate(id,plyLoad,{
//     new:true,
//     runValidators:true
//   })

//   return result
// }

export const offeredCourseServices = {
    createOfferedCourseIntoDB
}
