import config from "../../config"
import { TStudent } from "../students/student.interface"
import { Student } from "../students/student.model"
import { TUser } from "./user.interface"
import { User } from "./user.model"

const createStudentIntoDB = async (password:string, studentData: TStudent) => {
    
    //Create new user
    const userData:Partial<TUser> = {}  

    //set password if not given
    userData.password = password || (config.default_password as string)

    //set user role
    userData.role = 'student'
     
    //manually set generated id
    userData.id = '2015111200'

    //create  user
    const newUser = await User.create(userData)

    //create student

    if(Object.keys(newUser).length){
        studentData.id = newUser.id
        studentData.user = newUser._id //ref ID

        const newStudent = await Student.create(studentData)
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