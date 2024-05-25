import Joi from 'joi'

const joiStudentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'Student ID must be a string.',
    'string.empty': 'Student ID is required.',
    'any.required': 'Student ID is required.',
  }),
  name: {
    firstName: Joi.string().max(18).trim().required().messages({
      'string.base': 'First name must be a string.',
      'string.empty': 'First name is required.',
      'string.max': 'First name must be within 18 characters.',
      'any.required': 'First name is required.',
    }),
    middleName: Joi.string().optional().allow(null, ''),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z]+$/)
      .required()
      .messages({
        'string.base': 'Last name must be a string.',
        'string.empty': 'Last name is required.',
        'string.pattern.base': '{#value} is not valid.',
        'any.required': 'Last name is required.',
      }),
  },
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.email': 'Email must be a valid email address.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.',
  }),
  doBarth: Joi.date()
    .iso()
    .messages({
      'date.base': 'Date of birth must be a valid date.',
      'date.format': 'Date of birth must be in ISO format (YYYY-MM-DD).',
    })
    .optional()
    .allow(null, ''),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only':
        '{#value} is not a valid blood group. Choose from A+, A-, B+, B-, AB+, AB-, O+, O-.',
    }),
  gender: Joi.string().valid('Male', 'Female').required().messages({
    'any.only':
      '{#value} is not a valid option. Choose either "Male" or "Female".',
    'any.required': 'Gender is required.',
  }),
  contactNo: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.base': 'Contact number must be a string.',
      'string.empty': 'Contact number is required.',
      'string.pattern.base': 'Contact number must contain only digits.',
      'string.min': 'Contact number must be at least 10 digits.',
      'string.max': 'Contact number must be at most 15 digits.',
      'any.required': 'Contact number is required.',
    }),
  EmergencyContactNo: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.base': 'Emergency contact number must be a string.',
      'string.empty': 'Emergency contact number is required.',
      'string.pattern.base':
        'Emergency contact number must contain only digits.',
      'string.min': 'Emergency contact number must be at least 10 digits.',
      'string.max': 'Emergency contact number must be at most 15 digits.',
      'any.required': 'Emergency contact number is required.',
    }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address must be a string.',
    'string.empty': 'Permanent address is required.',
    'any.required': 'Permanent address is required.',
  }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address must be a string.',
    'string.empty': 'Present address is required.',
    'any.required': 'Present address is required.',
  }),
  guardian: {
    fatherName: Joi.string().required().messages({
      'string.base': "Father's name must be a string.",
      'string.empty': "Father's name is required.",
      'any.required': "Father's name is required.",
    }),
    fatherOccupation: Joi.string().required().messages({
      'string.base': "Father's occupation must be a string.",
      'string.empty': "Father's occupation is required.",
      'any.required': "Father's occupation is required.",
    }),
    fatherContactNo: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(15)
      .required()
      .messages({
        'string.base': "Father's contact number must be a string.",
        'string.empty': "Father's contact number is required.",
        'string.pattern.base':
          "Father's contact number must contain only digits.",
        'string.min': "Father's contact number must be at least 10 digits.",
        'string.max': "Father's contact number must be at most 15 digits.",
        'any.required': "Father's contact number is required.",
      }),
    motherName: Joi.string().required().messages({
      'string.base': "Mother's name must be a string.",
      'string.empty': "Mother's name is required.",
      'any.required': "Mother's name is required.",
    }),
    motherOccupation: Joi.string().required().messages({
      'string.base': "Mother's occupation must be a string.",
      'string.empty': "Mother's occupation is required.",
      'any.required': "Mother's occupation is required.",
    }),
    motherContactNo: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(15)
      .required()
      .messages({
        'string.base': "Mother's contact number must be a string.",
        'string.empty': "Mother's contact number is required.",
        'string.pattern.base':
          "Mother's contact number must contain only digits.",
        'string.min': "Mother's contact number must be at least 10 digits.",
        'string.max': "Mother's contact number must be at most 15 digits.",
        'any.required': "Mother's contact number is required.",
      }),
  },
  profileImg: Joi.string().uri().optional().allow(null, '').messages({
    'string.uri': 'Profile image must be a valid URI.',
  }),
  isActive: Joi.string()
    .valid('Active', 'Inactive')
    .default('Active')
    .messages({
      'any.only': 'isActive must be either "Active" or "Inactive".',
    }),
  localGuardian: {
    name: Joi.string().required().messages({
      'string.base': "Local guardian's name must be a string.",
      'string.empty': "Local guardian's name is required.",
      'any.required': "Local guardian's name is required.",
    }),
    occupation: Joi.string().required().messages({
      'string.base': "Local guardian's occupation must be a string.",
      'string.empty': "Local guardian's occupation is required.",
      'any.required': "Local guardian's occupation is required.",
    }),
    contactNo: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(15)
      .required()
      .messages({
        'string.base': "Local guardian's contact number must be a string.",
        'string.empty': "Local guardian's contact number is required.",
        'string.pattern.base':
          "Local guardian's contact number must contain only digits.",
        'string.min':
          "Local guardian's contact number must be at least 10 digits.",
        'string.max':
          "Local guardian's contact number must be at most 15 digits.",
        'any.required': "Local guardian's contact number is required.",
      }),
    address: Joi.string().required().messages({
      'string.base': "Local guardian's address must be a string.",
      'string.empty': "Local guardian's address is required.",
      'any.required': "Local guardian's address is required.",
    }),
  },
})

export default joiStudentValidationSchema
