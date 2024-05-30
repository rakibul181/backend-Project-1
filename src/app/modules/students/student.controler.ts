import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentID } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentID)
    res.status(200).json({
      success: true,
      message: 'A student gotten successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentID } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentID)
    res.status(200).json({
      success: true,
      message: 'A student deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Student are gotten successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
}
