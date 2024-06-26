import { Schema, model } from 'mongoose'
import validator from 'validator'
import { AdminModel, TAdmin, TUserName } from './admin.interface'

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

const AdminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'Admin ID is required.'],
      unique: true,
    },
    user: {
      type: Schema.ObjectId,
      required: [true, ' User Id is required.'],
      unique: true,
      ref: 'User',
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
      type: Date,
    },
    bloodGroup: {
      type: String,
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

    profileImg: {
      type: String,
    },
  
    designation: {
      type: String,
      required: [true, 'Designation Is required'],
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

AdminSchema.virtual('fullName').get(function () {
  return `${this.name?.firstName} ${this.name?.middleName} ${this.name?.lastName}`
})
// post save hook
// flitterOut deleted Doc
AdminSchema.pre('find', function (next) {
  this.find({
    isDelete: { $ne: true },
  })
  next()
})
AdminSchema.pre('findOne', function (next) {
  this.find({
    isDelete: { $ne: true },
  })
  next()
})
AdminSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });
  
export const Admin = model<TAdmin, AdminModel>('Admin', AdminSchema)
