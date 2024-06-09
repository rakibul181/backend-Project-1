import { TAcademicDepartment } from "./academicDepartment.interface"
import { AcademicDepartment } from "./academicDepartment.model"


const createAcademicDepartmentIntoDB = async (playLoad:TAcademicDepartment) => {
  const result = await AcademicDepartment.create(playLoad)
  return result
}
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find()
  return result
}
const getAcademicDepartmentByIDFromDB = async (id:string) => {
  const result = await AcademicDepartment.findById(id)
  return result
}

const updateAcademicDepartmentIntoDB = async (
  id: string,
  playLoad: Partial<TAcademicDepartment>,
) => {
  const result = AcademicDepartment.findByIdAndUpdate(id, playLoad, {
    new: true,
  })

  return result
}

export const academicDepartmentServices = {
   createAcademicDepartmentIntoDB,
   getAcademicDepartmentByIDFromDB,
   getAllAcademicDepartmentFromDB,
   updateAcademicDepartmentIntoDB,
}
