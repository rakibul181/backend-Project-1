import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicDepartmentValidation } from './academicDepartment.validation'
import { academicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-academic-department',
  // validateRequest(
  //   academicDepartmentValidation.createAcademicDepartmentSchemaValidation,
  // ),
  academicDepartmentController.createAcademicDepartment,
)
router.get('/', academicDepartmentController.getAllAcademicDepartment)
router.get(
  '/:departmentID',
  academicDepartmentController.getAcademicDepartmentByID,
)

router.patch(
  '/:departmentID',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentSchemaValidation,
  ),
  academicDepartmentController.updateAcademicDepartment,
)

export const AcademicDepartmentRouter = router
