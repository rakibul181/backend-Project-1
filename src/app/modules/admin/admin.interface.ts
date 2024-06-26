import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TAdmin = {
  id: string
  user:Types.ObjectId
  name: TUserName
  email: string
  doBarth?: Date
  contactNo: string
  designation: string
  EmergencyContactNo: string
  gender: 'Male' | 'Female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB-' | 'AB+' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  isDelete:boolean
}

 
export interface AdminModel extends  Model<TAdmin>{
    isUserExits(id: string): Promise<TAdmin | null>
}