import express from 'express'
import { adminControllers } from './admin.controller'
 
const router = express.Router()

router.get('/',  adminControllers.getAllAdmin)

// router.get('/:studentID', studentControllers.getSingleStudent)

// router.delete('/:studentID', studentControllers.deleteStudent)

// router.patch('/:studentID', studentControllers.updateStudent)

export const AdminRoutes = router
