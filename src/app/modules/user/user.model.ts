import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>({
  id: {
    type: String,
    required: true,
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
   password:{
    type:String,
   },
  needsPasswordChange:{
    type:Boolean,
    default:true
  },
  role:{
    type:String,
    enum:['admin','student','faculty']
  },
  status:{
    type:String,
    enum:['in-progress','blocked'],
    default:'in-progress'
  }

  
},{
    timestamps:true
})

export const User = model<TUser>('user',userSchema)
