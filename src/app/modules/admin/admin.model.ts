import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type TStudent = {
  id: string
  user:Types.ObjectId
  name: TUserName
  email: string
  doBarth?: Date
  contactNo: string
  EmergencyContactNo: string
  gender: 'Male' | 'Female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB-' | 'AB+' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  admissionSemester: Types.ObjectId
  admissionDepartment:Types.ObjectId
  profileImg?: string
   isDelete:boolean
}

export type StudentMethods = {
  isUserExits(id: string): Promise<TStudent | null>
}
export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>
