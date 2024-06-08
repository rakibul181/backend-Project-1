import { academicSemesterCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (playLoad: TAcademicSemester) => {
  if (academicSemesterCodeMapper[playLoad.name] !== playLoad.code) {
    throw new Error('Invalid Semester code error')
  }

  const result = AcademicSemester.create(playLoad)
  return result
}

const getAllAcademicSemesterFromDB = async () => {
  const result = AcademicSemester.find()
  return result
}
const getSingleAcademicSemesterByIDFromDB = async (id: string) => {
  const result = AcademicSemester.findById(id)
  return result
}
const updateAcademicSemesterByIDFromDB = async (
  id: string,
  playLoad: Partial<TAcademicSemester>,
) => {
  if (
    playLoad.name &&
    playLoad.code &&
    academicSemesterCodeMapper[playLoad.name] !== playLoad.code
  ) {
    throw new Error('Update failed, Invalid Semester code error')
  }
  const result = AcademicSemester.findByIdAndUpdate(id, playLoad, {
    new: true,
  })
  return result
}

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterByIDFromDB,
  updateAcademicSemesterByIDFromDB,
}
