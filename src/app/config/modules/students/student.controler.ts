import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData)

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentID)
    res.status(200).json({
      success: true,
      message: 'A student gotten successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Student are gotten successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const studentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
}
