import { Request, Response } from "express"
import { UserService } from "./user.service"

const createStudent = async (req: Request, res: Response) => {
    try {
      const {password, student: studentData } = req.body
  
      // const {error} = joiStudentValidationSchema.validate(studentData)
      // will call service function to send this data into db
  
    //   const zodParse = zodStudentValidationSchema.parse(studentData)
  
      const result = await UserService.createStudentIntoDB(password,studentData)
         
  
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

  export const  UsersControllers = {
    createStudent
  }