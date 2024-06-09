import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { academicFacultyController } from './AcademicFaculty.controller'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.academicFacultySchemaValidation),
  academicFacultyController.createAcademicFaculty,
)
router.get(
  '/',
  academicFacultyController.getAllAcademicFaculty,
)
router.get(
  '/:facultyID',
  academicFacultyController.getAllAcademicFaculty,
)

router.patch(
    '/:facultyID',
    validateRequest(academicFacultyValidation.academicFacultySchemaValidation),
    academicFacultyController.updateAcademicFaculty,
  )


 export const AcademicFacultyRouter  = router
