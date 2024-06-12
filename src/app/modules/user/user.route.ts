import express from 'express'
import { UsersControllers } from './user.controller'
import { StudentValidations } from '../students/student.validation.zod'
import validateRequest from '../../middleware/validateRequest'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(StudentValidations.CreateStudentValidationSchema),
  UsersControllers.createStudent,
)

export const UserRoutes = router
