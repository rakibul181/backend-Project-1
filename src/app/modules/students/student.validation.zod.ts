import { z } from 'zod'

// UserName Schema Validation
const userNameSchema = z.object({
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

// Guardian Schema Validation
const guardianSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required."),
  fatherOccupation: z.string().min(1, "Father's occupation is required."),
  fatherContactNo: z
    .string()
    .regex(/^[0-9]+$/, "Father's contact number must contain only digits.")
    .min(10, "Father's contact number must be at least 10 digits.")
    .max(15, "Father's contact number must be at most 15 digits."),
  motherName: z.string().min(1, "Mother's name is required."),
  motherOccupation: z.string().min(1, "Mother's occupation is required."),
  motherContactNo: z
    .string()
    .regex(/^[0-9]+$/, "Mother's contact number must contain only digits.")
    .min(10, "Mother's contact number must be at least 10 digits.")
    .max(15, "Mother's contact number must be at most 15 digits."),
})

// Local Guardian Schema Validation
const localGuardianSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required."),
  occupation: z.string().min(1, "Local guardian's occupation is required."),
  contactNo: z
    .string()
    .regex(
      /^[0-9]+$/,
      "Local guardian's contact number must contain only digits.",
    )
    .min(10, "Local guardian's contact number must be at least 10 digits.")
    .max(15, "Local guardian's contact number must be at most 15 digits."),
  address: z.string().min(1, "Local guardian's address is required."),
})

// Student Schema Validation
const zodStudentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required.'),
  password: z.string().min(6, 'password is required.'),
  name: userNameSchema,
  email: z
    .string()
    .email('Email must be a valid email address.')
    .min(1, 'Email is required.'),
  doBarth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Date of birth must be a valid date in ISO format (YYYY-MM-DD).',
    }),
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
  presentAddress: z.string().min(1, 'Present address is required.'),
  guardian: guardianSchema,
  profileImg: z.string().url('Profile image must be a valid URL.').optional(),
  isActive: z.enum(['Active', 'Inactive']).default('Active'),
  isDelete:z.boolean().default(false),
  localGuardian: localGuardianSchema,
})

export default zodStudentValidationSchema
