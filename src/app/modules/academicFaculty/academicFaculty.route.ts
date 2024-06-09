import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { academicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.academicFacultySchemaValidation),
  academicFacultyController.createAcademicFaculty,
)
router.get('/', academicFacultyController.getAllAcademicFaculty)
router.get('/:departmentID', academicFacultyController.getAllAcademicFaculty)

router.patch(
  '/:departmentID',
  validateRequest(academicFacultyValidation.academicFacultySchemaValidation),
  academicFacultyController.updateAcademicFaculty,
)

export const AcademicFacultyRouter = router
