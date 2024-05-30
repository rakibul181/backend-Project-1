import express from 'express'
import { studentControllers } from './student.controler'

const router = express.Router()


router.get('/:studentID', studentControllers.getSingleStudent)

router.delete('/:studentID', studentControllers.deleteStudent)

router.get('/', studentControllers.getAllStudent)

export const StudentRoutes = router
