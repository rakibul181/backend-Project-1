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
router.get('/',  courseControllers.getAllCourse)

router.get('/:id',  courseControllers.getSingleCourse)

// router.patch('/:id', facultyControllers.updateFaculty)

router.delete('/:id',  courseControllers.deleteCourse)


export const CoursesRoutes = router
