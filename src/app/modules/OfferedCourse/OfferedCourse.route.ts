import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { offeredCourseValidation } from './OfferedCourse.validations'
import { offeredCourseController } from './OfferedCourse.controller'
const router = express.Router()

router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse,
)

router.get('/', offeredCourseController.getAllOfferedCourse)

router.get('/:id', offeredCourseController.getSingleOfferedCourse)

router.patch(
  '/:id',
  validateRequest(offeredCourseValidation.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse,
)

router.delete('/:id', offeredCourseController.deleteOfferedCourse)

export const OfferedCourseRouter = router
