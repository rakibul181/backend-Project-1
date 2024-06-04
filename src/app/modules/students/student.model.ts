import { Schema, model } from 'mongoose'
import validator from 'validator'

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface'
   
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    maxlength: [18, 'First Name must be within 18 characters'],
    trim: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
})

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    user: {
      type: Schema.ObjectId,
      required: [true, ' User Id is required.'],
      unique:true,
      ref:"User"
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    doBarth: {
      type: String,
    },
    bloodGroup: {
      // type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB-', 'AB+', 'O+', 'O-'],
      },
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Gender is required.'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    EmergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required.'],
    },
    profileImg: {
      type: String,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required.'],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

 

///virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})
// post save hook



//model

//------------creating custom static method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id })
//   return existingUser
// }
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
