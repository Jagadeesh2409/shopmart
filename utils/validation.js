const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email is required",
  }),
  phone_number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
      "string.empty": "Phone number is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Enter a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
}).unknown(false); // disallow extra fields

//units

const createUnitSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have at least 1 character",
    "any.required": "Name is required",
  }),

  abbreviation: Joi.string().trim().max(10).required().messages({
    "string.base": "Abbreviation must be a string",
    "string.empty": "Abbreviation cannot be empty",
    "any.required": "Abbreviation is required",
  }),
});

const updateUnitSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).optional(),

  abbreviation: Joi.string().trim().max(10).optional(),
})
  .min(1)
  .messages({
    "object.min":
      "At least one field (name or abbreviation) must be provided for update",
  });


  // Create Category Validation
const createCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Category name cannot be empty',
      'string.min': 'Category name should be at least 2 characters long',
      'string.max': 'Category name should not exceed 100 characters',
      'any.required': 'Category name is required',
    }),

  description: Joi.string()
    .trim()
    .allow(null, '')
    .max(255)
    .messages({
      'string.max': 'Description should not exceed 255 characters',
    }),
});

// Update Category Validation
const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  description: Joi.string().trim().allow(null, '').max(255).optional(),
})
  .min(1)
  .messages({
    'object.min': 'At least one field (name or description) must be provided to update',
  });

 const createProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Product name must be a text value',
      'string.empty': 'Product name cannot be empty',
      'string.min': 'Product name must be at least 2 characters long',
      'string.max': 'Product name should not exceed 100 characters',
      'any.required': 'Product name is required',
    }),

  description: Joi.string()
    .allow('', null)
    .messages({
      'string.base': 'Description must be a text value',
    }),

  original_price: Joi.number()
    .precision(2)
    .required()
    .messages({
      'number.base': 'Original price must be a number',
      'any.required': 'Original price is required',
    }),

  mrp: Joi.number()
    .precision(2)
    .required()
    .messages({
      'number.base': 'MRP must be a number',
      'any.required': 'MRP is required',
    }),

  selling_price: Joi.number()
    .precision(2)
    .required()
    .messages({
      'number.base': 'Selling price must be a number',
      'any.required': 'Selling price is required',
    }),

  details: Joi.object()
    .unknown(true)
    .messages({
      'object.base': 'Details must be a valid object',
    }),

  brand: Joi.string()
    .required()
    .messages({
      'string.base': 'Brand must be a text value',
      'any.required': 'Brand is required',
      'string.empty': 'Brand cannot be empty',
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      'number.base': 'Stock must be a valid integer',
      'number.min': 'Stock cannot be negative',
    }),

  category_id: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Category ID must be an integer',
      'any.required': 'Category ID is required',
    }),

  unit_id: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Unit ID must be an integer',
      'any.required': 'Unit ID is required',
    }),

  image_url: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Image URL must be a valid URI',
    }),
});

// ✅ Update Product Schema — all optional but with messages
const updateProductSchema = createProductSchema
  .fork(Object.keys(createProductSchema.describe().keys), (schema) => schema.optional())
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided to update a product',
  });





module.exports = {
  registerSchema,
  loginSchema,
  createUnitSchema,
  updateUnitSchema,
  createCategorySchema,
  updateCategorySchema,
  createProductSchema,
  updateProductSchema,
};
