import { UserService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  // const {error} = joiStudentValidationSchema.validate(studentData)
  // will call service function to send this data into db

  //   const zodParse = zodStudentValidationSchema.parse(studentData)

  const result = await UserService.createStudentIntoDB(password, studentData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  })
})
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body


  const result = await UserService.createAdminIntoDB(password, adminData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  })
})

export const UsersControllers = {
  createStudent,
  createAdmin
}
