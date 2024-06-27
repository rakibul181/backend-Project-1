import express from 'express'
import { facultyControllers } from './faculty.controller'
import validateRequest from '../../middleware/validateRequest'
import { FacultyValidations } from './faculty.validation'
  
const router = express.Router()

router.get('/',  facultyControllers.getAllFaculty)

router.get('/:id',  facultyControllers.getSingleFaculty)

router.patch('/:id',(validateRequest(FacultyValidations.updateFacultyValidationSchema)), facultyControllers.updateFaculty)

router.delete('/:id', facultyControllers.deleteFaculty)
 

export const FacultyRoutes = router
