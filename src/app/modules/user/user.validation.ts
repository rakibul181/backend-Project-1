import { z } from "zod";

const userValidationSchema = z.object({
    id:z.string({
        invalid_type_error:'Password must be string'
    }),
    password:z.string().max(20,'Must Be within 20 characters').optional(),  
})

export const userValidation = {
    userValidationSchema
}