import { z } from "zod";
 
const createAcademicDepartmentSchemaValidation = z.object({
    body:z.object({
        name: z.string({
            invalid_type_error:'Academic Faculty Must be string',
            required_error:'name is required'
        }),
        academicFaculty: z.string({
            invalid_type_error:'Academic Faculty Must be string',
            required_error:'Academic Faculty required'
        })
    })
})
const updateAcademicDepartmentSchemaValidation = z.object({
    body:z.object({
        name: z.string({
            invalid_type_error:'Academic Faculty Must be string',
            required_error:'name is required'
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error:'Academic Faculty Must be string',
            required_error:'Academic Faculty required'
        }).optional()
    })
})

export const  academicDepartmentValidation ={
    createAcademicDepartmentSchemaValidation,
    updateAcademicDepartmentSchemaValidation,
}