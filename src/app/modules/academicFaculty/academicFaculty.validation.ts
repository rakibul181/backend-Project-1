import { z } from "zod";

const academicFacultySchemaValidation = z.object({
    body:z.object({
        name: z.string({
            invalid_type_error:'Academic Faculty Must be string'
        })
    })
})

export const  academicFacultyValidation ={
    academicFacultySchemaValidation
}