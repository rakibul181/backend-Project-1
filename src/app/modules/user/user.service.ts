import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import { AppError } from '../../utils/appError'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, playLoad: TStudent) => {
  //Create new user
  const userData: Partial<TUser> = {}

  const session = await mongoose.startSession()

  //set password if not given
  userData.password = password || (config.default_password as string)

  //set user role
  userData.role = 'student'

  const admissionSemester = await AcademicSemester.findById(
    playLoad.admissionSemester,
  )

  try {
    session.startTransaction()
    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester)
    }

    //create  user
    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new User')
    }
    if (Object.keys(newUser).length) {
      playLoad.id = newUser[0].id
      playLoad.user = newUser[0]._id //ref ID

      const newStudent = await Student.create([playLoad], { session })

      if (!newStudent) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to create new Student',
        )
      }

      await session.commitTransaction()
      await session.endSession()
      return newStudent
    }
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }

  //create student

  // for creating Static

  //===========for creating instance
  // const student = new Student(studentData) //create an instance
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('User Already exists')
  // }
  // const result = await student.save() //built in instance
}

export const UserService = {
  createStudentIntoDB,
}
