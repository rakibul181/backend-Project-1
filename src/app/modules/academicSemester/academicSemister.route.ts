import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemesterValidation } from './Validation'
import { AcademicSemesterControllers } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)

export const AcademicSemesterRoutes = router
