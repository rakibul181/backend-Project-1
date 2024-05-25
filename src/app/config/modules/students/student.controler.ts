import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import zodStudentValidationSchema from './student.validation.zod'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // const {error} = joiStudentValidationSchema.validate(studentData)
    // will call service function to send this data into db

    const zodParse = zodStudentValidationSchema.parse(studentData)

    const result = await StudentServices.createStudentIntoDB(zodParse)
       

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some thing went wrong',
      data: error,
    })
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
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some thing went wrong',
      data: error,
    })
  }
}
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentID)
    res.status(200).json({
      success: true,
      message: 'A student deleted successfully',
      data: result,
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some thing went wrong',
      data: error,
    })
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
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some thing went wrong',
      data: error,
    })
  }
}

export const studentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent
}
