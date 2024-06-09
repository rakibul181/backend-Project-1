import express from 'express'
import validateRequest from '../../middleware/validateRequest'
 import { AcademicSemesterControllers } from './academicSemester.controller'
import { AcademicSemesterValidation } from './academicSemester.validation'
  
const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)
router.get('/', AcademicSemesterControllers.getAllAcademicSemester)
router.get('/:semesterID', AcademicSemesterControllers.getSingleAcademicSemesterByID)

router.patch(
  '/:semesterID',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemesterByID,
)

export const AcademicSemesterRoutes = router
