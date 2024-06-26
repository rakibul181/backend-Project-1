import express from 'express'
import { adminControllers } from './admin.controller'
 
const router = express.Router()

router.get('/',  adminControllers.getAllAdmin)

router.get('/:id',  adminControllers.getSingleAdmin)

router.patch('/:id', adminControllers.updateAdmin)

// router.delete('/:studentID', studentControllers.deleteStudent)


export const AdminRoutes = router
