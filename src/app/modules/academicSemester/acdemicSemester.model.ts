import { Schema, model } from 'mongoose'
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from './academicSemester'

const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const AcademicSemesterName:TAcademicSemesterName[] = ['Autumn' , 'Summer'  , 'Fall']
const AcademicSemesterCode:TAcademicSemesterCode[] = ['01' , '02'  , '03']

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum:AcademicSemesterName
  },
  code: {
    type: String,
    required: true,
    enum:AcademicSemesterCode

  },
  year: {
    type: Date,
    required: true,
  },
  startDate: {
    type: String,
    enum: Months,
  },
  endDate: {
    type: String,
    enum: Months,
  },
})

export const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
)
