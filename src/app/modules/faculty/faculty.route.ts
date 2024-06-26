import express from 'express'
import { facultyControllers } from './faculty.controller'
  
const router = express.Router()

router.get('/',  facultyControllers.getAllFaculty)

router.get('/:id',  facultyControllers.getSingleFaculty)

router.patch('/:id', facultyControllers.updateFaculty)

router.delete('/:id', facultyControllers.deleteFaculty)


export const FacultyRoutes = router
