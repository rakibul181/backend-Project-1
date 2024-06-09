import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (playLoad:TAcademicFaculty) => {
  const result = await AcademicFaculty.create(playLoad)
  return result
}
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find()
  return result
}
const getAcademicFacultyByIDFromDB = async (id:string) => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateAcademicFacultyIntoDB = async (
  id: string,
  playLoad: Partial<TAcademicFaculty>,
) => {
  const result = AcademicFaculty.findByIdAndUpdate(id, playLoad, {
    new: true,
  })

  return result
}

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getAcademicFacultyByIDFromDB,
  updateAcademicFacultyIntoDB,
}
