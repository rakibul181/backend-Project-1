import express from 'express'
import { UsersControllers } from './user.controller'
import { StudentValidations } from '../students/student.validation.zod'
import validateRequest from '../../middleware/validateRequest'
import { AdminValidations } from '../admin/admin.validation'
import { FacultyValidations } from '../faculty/faculty.validation'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(StudentValidations.CreateStudentValidationSchema),
  UsersControllers.createStudent,
)
router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.CreateFacultyValidationSchema ),
  UsersControllers.createFaculty,
)
router.post(
  '/create-admin',
  validateRequest(AdminValidations.CreateAdminValidationSchema),
  UsersControllers.createAdmin,
)

export const UserRoutes = router
