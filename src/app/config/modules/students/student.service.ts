import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student)
  const student = new Student(studentData) //create an instance
  if (await student.isUserExits(studentData.id)) {
    throw new Error('User Already exists')
  }
  const result = await student.save() //built in instance
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()

  return result
}

const getSingleStudentFromDB = async (studentID: string) => {
  const result = await Student.findOne({ id: studentID })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
