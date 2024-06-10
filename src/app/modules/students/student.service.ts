import { Student } from './student.model'



const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionDepartment')

  return result
}

const getSingleStudentFromDB = async (studentID: string) => {
  // const result = await Student.findOne({ id: studentID })
  const result = await Student.aggregate([
    {
      $match:{
        id:{$eq:studentID}
      }
    }
  ])
  return result
}
const deleteStudentFromDB = async (studentID: string) =>{ 
  const result = await Student.updateOne({ id: studentID },{isDelete:true})
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
