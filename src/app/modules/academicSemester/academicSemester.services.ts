import { academicSemesterCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
 
 
const createAcademicSemesterIntoDB =async(playLoad:TAcademicSemester)=>{
    if(academicSemesterCodeMapper[playLoad.name]!== playLoad.code){
        throw new Error('Invalid Semester code error')
    }
    
    const result = AcademicSemester.create(playLoad)
    return result
}

export const academicSemesterServices ={
    createAcademicSemesterIntoDB
}