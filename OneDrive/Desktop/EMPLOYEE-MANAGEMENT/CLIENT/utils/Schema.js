import Joi from "joi";

const schema = Joi.object({
  fullName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Full Name is required",
    "string.min": "Full Name should have at least 3 characters",
    "string.max": "Full Name should have at most 30 characters",
  }),
  dob: Joi.date().required().messages({
    "date.base": "Date of Birth is required",
  }),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  nationality: Joi.string().required().messages({
    "string.empty": "Nationality is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
      "string.empty": "Phone number is required",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
    }),
  employeeId: Joi.string().required().messages({
    "string.empty": "Employee ID is required",
  }),
  department: Joi.string().required().messages({
    "string.empty": "Department is required",
  }),
  jobTitle: Joi.string().required().messages({
    "string.empty": "Job Title is required",
  }),
  dateOfJoining: Joi.date().required().messages({
    "date.base": "Date of Joining is required",
  }),
  employmentStatus: Joi.string()
    .valid("Full-time", "Part-time", "Contract")
    .required(),
});

export default schema;
