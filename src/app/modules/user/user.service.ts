import config from "../../config"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { TStudent } from "../students/student.interface"
import { Student } from "../students/student.model"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import { generateStudentId } from "./user.utils"
 

const createStudentIntoDB = async (password:string, playLoad: TStudent) => {
    
    //Create new user
    const userData:Partial<TUser> = {}  

    //set password if not given
    userData.password = password || (config.default_password as string)

    //set user role
    userData.role = 'student'

    const admissionSemester = await AcademicSemester.findById(playLoad.admissionSemester)
     
   if(admissionSemester)
  {userData.id = await generateStudentId(admissionSemester)}

    //create  user
    const newUser = await User.create(userData)

    //create student

    if(Object.keys(newUser).length){
        playLoad.id = newUser.id
        playLoad.user = newUser._id //ref ID

        const newStudent = await Student.create(playLoad)
        return newStudent

    }
  
  // for creating Static
  
  
  
  
  //===========for creating instance
    // const student = new Student(studentData) //create an instance
    // if (await student.isUserExits(studentData.id)) {
    //   throw new Error('User Already exists')
    // }
    // const result = await student.save() //built in instance
   }

  export const UserService = {
    createStudentIntoDB
  }