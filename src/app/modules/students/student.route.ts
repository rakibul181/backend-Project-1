import express from 'express'
import { studentControllers } from './student.controler'

const router = express.Router()

router.post('/create-student', studentControllers.createStudent)

router.get('/:studentID', studentControllers.getSingleStudent)

router.delete('/:studentID', studentControllers.deleteStudent)

router.get('/', studentControllers.getAllStudent)

export const StudentRoutes = router
