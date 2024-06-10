import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import { AppError } from '../../utils/appError'
 
const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
)

academicDepartmentSchema.pre('save', async function (next) {
  const isDeptExist = await AcademicDepartment.findOne({ name: this.name })
  if (isDeptExist) {
    throw new AppError(404,'Department is already Exist')
  }
  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery()
    const isDeptExist = await AcademicDepartment.findOne(query)
  if (!isDeptExist) {
    throw new Error('This Department does not Exist')
  }
  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
