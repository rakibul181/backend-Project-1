import { z } from 'zod'

// UserName Schema Validation
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(18, 'First name must be within 18 characters.')
    .min(1, 'First name is required.')
    .trim(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, '{value} is not valid.')
    .min(1, 'Last name is required.'),
})
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(18, 'First name must be within 18 characters.')
    .min(1, 'First name is required.')
    .trim()
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, '{value} is not valid.')
    .min(1, 'Last name is required.')
    .optional(),
})

// Faculty Schema Validation
const CreateFacultyValidationSchema = z.object({
  bod: z.object({
    password: z.string().min(6, 'password is required.'),
    faculty: z.object({
      name: createUserNameValidationSchema,
      email: z
        .string()
        .email('Email must be a valid email address.')
        .min(1, 'Email is required.'),
      doBarth: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      gender: z.enum(['Male', 'Female'], {
        required_error: 'Gender is required.',
      }),
      contactNo: z
        .string()
        .regex(/^[0-9]+$/, 'Contact number must contain only digits.')
        .min(10, 'Contact number must be at least 10 digits.')
        .max(15, 'Contact number must be at most 15 digits.'),
      EmergencyContactNo: z
        .string()
        .regex(/^[0-9]+$/, 'Emergency contact number must contain only digits.')
        .min(10, 'Emergency contact number must be at least 10 digits.')
        .max(15, 'Emergency contact number must be at most 15 digits.'),
      permanentAddress: z.string().min(1, 'Permanent address is required.'),
      presentAddress: z.string().min(1, 'P       resent address is required.'),
      academicDepartment: z.string(),
      profileImg: z
        .string()
        .url('Profile image must be a valid URL.')
        .optional(),
      designation: z.string(),
    }),
  }),
})
const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, 'password is required.'),
    faculty: z.object({
      name: updateUserNameValidationSchema,
      email: z
        .string()
        .email('Email must be a valid email address.')
        .min(1, 'Email is required.')
        .optional(),
      doBarth: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      gender: z
        .enum(['Male', 'Female'], {
          required_error: 'Gender is required.',
        })
        .optional(),
      contactNo: z
        .string()
        .regex(/^[0-9]+$/, 'Contact number must contain only digits.')
        .min(10, 'Contact number must be at least 10 digits.')
        .max(15, 'Contact number must be at most 15 digits.')
        .optional(),
      EmergencyContactNo: z
        .string()
        .regex(/^[0-9]+$/, 'Emergency contact number must contain only digits.')
        .min(10, 'Emergency contact number must be at least 10 digits.')
        .max(15, 'Emergency contact number must be at most 15 digits.')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent address is required.')
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'P       resent address is required.')
        .optional(),
       profileImg: z
        .string()
        .url('Profile image must be a valid URL.')
        .optional(),
      designation: z.string().optional(),
      academicDepartment: z.string().optional(),


    }),
  }),
})

export const FacultyValidations = {
    CreateFacultyValidationSchema,
   updateFacultyValidationSchema,
}
