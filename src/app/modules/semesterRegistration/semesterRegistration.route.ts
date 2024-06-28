import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { semesterRegistrationValidation } from './semesterRegistration.validations'
import { semesterRegistrationController } from './semesterRegistration.controller'
const router = express.Router()

router.post('/create-semester-registration',validateRequest(semesterRegistrationValidation.semesterRegistrationValidationSchema),semesterRegistrationController.createSemesterRegistration)

router.get('/', semesterRegistrationController.getAllSemesterRegistration)

export  const SemesterRegistrationRouter = router