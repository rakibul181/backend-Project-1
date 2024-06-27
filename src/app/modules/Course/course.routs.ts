import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { CourseValidation } from './course.validation'
import { courseControllers } from './course.controller'
   
const router = express.Router()

router.post(
    '/create-course',
    validateRequest(CourseValidation.createCourseValidationSchema),
    courseControllers.createCourse,
  )
router.put(
    '/:courseId/assign-faculties',
    validateRequest(CourseValidation.assignFacultyWithCourseValidationSchema),
    courseControllers.assignFacultyWithCourse,
  )
router.delete(
    '/:courseId/remove-faculties',
    validateRequest(CourseValidation.assignFacultyWithCourseValidationSchema),
    courseControllers.removeFacultyWithCourse,
  )

router.get('/',  courseControllers.getAllCourse)

router.get('/:id',  courseControllers.getSingleCourse)

router.patch('/:id',validateRequest(CourseValidation.updateCourseValidationSchema), courseControllers.updateCourse)

router.delete('/:id',  courseControllers.deleteCourse)


export const CoursesRoutes = router
