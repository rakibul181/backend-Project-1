import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { offeredCourseValidation } from './OfferedCourse.validations'
import { offeredCourseController } from './OfferedCourse.controller'
const router = express.Router()

router.post(
  '/create-offered-course',
  validateRequest(
    offeredCourseValidation.createOfferedCourseValidationSchema,
  ),
  offeredCourseController.createOfferedCourse,
)

// router.get('/', semesterRegistrationController.getAllSemesterRegistration)

// router.get('/:id', semesterRegistrationController.getSingleSemesterRegistration)

// router.patch(
//   '/:id',
//   validateRequest(
//     semesterRegistrationValidation.UpdateSemesterRegistrationValidationSchema,
//   ),
//   semesterRegistrationController. updateSemesterRegistration,
// )

export const OfferedCourseRouter = router
