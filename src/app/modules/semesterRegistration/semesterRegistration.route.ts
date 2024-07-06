import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { semesterRegistrationValidation } from './semesterRegistration.validations'
import { semesterRegistrationController } from './semesterRegistration.controller'
const router = express.Router()

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
)

router.get('/', semesterRegistrationController.getAllSemesterRegistration)

router.get('/:id', semesterRegistrationController.getSingleSemesterRegistration)
router.delete('/:id', semesterRegistrationController.deleteSemesterRegistration)

router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidation.UpdateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController. updateSemesterRegistration,
)

export const SemesterRegistrationRouter = router
