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


const updateProductSchema = createProductSchema
  .fork(Object.keys(createProductSchema.describe().keys), (schema) => schema.optional())
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided to update a product',
  });



const createDiscountSchema = Joi.object({
  product_id: Joi.number().integer().positive().required().messages({
    "number.base": "Product ID must be a number",
    "number.integer": "Product ID must be an integer",
    "any.required": "Product ID is required",
  }),

  discount_type: Joi.string()
    .valid("PERCENTAGE", "FLAT")
    .required()
    .messages({
      "any.only": "Discount type must be either PERCENTAGE or FLAT",
      "any.required": "Discount type is required",
    }),

  percentage: Joi.when("discount_type", {
    is: "PERCENTAGE",
    then: Joi.number().min(0).max(100).precision(2).required().messages({
      "number.base": "Percentage must be a number",
      "number.min": "Percentage cannot be less than 0",
      "number.max": "Percentage cannot exceed 100",
      "any.required": "Percentage is required for PERCENTAGE discount type",
    }),
    otherwise: Joi.number().precision(2).default(0),
  }),

  flat_amount: Joi.when("discount_type", {
    is: "FLAT",
    then: Joi.number().min(0).precision(2).required().messages({
      "number.base": "Flat amount must be a number",
      "any.required": "Flat amount is required for FLAT discount type",
    }),
    otherwise: Joi.number().precision(2).default(0),
  }),

  min_purchase_amount: Joi.number()
    .min(0)
    .precision(2)
    .optional()
    .messages({
      "number.base": "Minimum purchase amount must be a number",
    }),

  max_purchase_amount: Joi.number()
    .min(Joi.ref("min_purchase_amount"))
    .precision(2)
    .optional()
    .messages({
      "number.base": "Maximum purchase amount must be a number",
      "number.min": "Maximum purchase amount must be greater than or equal to minimum purchase amount",
    }),

  start_date: Joi.date().required().messages({
    "date.base": "Start date must be a valid date",
    "any.required": "Start date is required",
  }),

  end_date: Joi.date()
    .greater(Joi.ref("start_date"))
    .optional()
    .messages({
      "date.base": "End date must be a valid date",
      "date.greater": "End date must be after the start date",
    }),

  used_count: Joi.number().integer().min(0).default(0),
  is_deleted: Joi.boolean().default(false),
});

const updateDiscountSchema = createDiscountSchema.fork(
  Object.keys(createDiscountSchema.describe().keys),
  (schema) => schema.optional()
);



const createCartSchema = Joi.object({
  product_id: Joi.number().integer().positive().required().messages({
    "number.base": "Product ID must be a number",
    "number.integer": "Product ID must be an integer",
    "number.positive": "Product ID must be a positive number",
    "any.required": "Product ID is required",
  }),

  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

const updateCartSchema = createCartSchema.fork(
  Object.keys(createCartSchema.describe().keys),
  (schema) => schema.optional()
);


const createPincodeSchema = Joi.object({
  pincode: Joi.string()
    .pattern(/^[1-9][0-9]{5}$/)
    .required()
    .messages({
      'string.empty': 'Pincode is required.',
      'string.pattern.base': 'Pincode must be a valid 6-digit number.',
      'any.required': 'Pincode field is mandatory.',
    }),

  city: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'City name is required.',
    'string.min': 'City name must be at least 2 characters long.',
    'any.required': 'City is mandatory.',
  }),

  district: Joi.string().trim().max(100).allow('', null).messages({
    'string.max': 'District name should not exceed 100 characters.',
  }),

  state: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'State name is required.',
    'any.required': 'State is mandatory.',
  }),

  country: Joi.string().trim().default('India').messages({
    'string.base': 'Country name must be a string.',
  }),
});

const updatePincodeSchema = createPincodeSchema.fork(
  Object.keys(createPincodeSchema.describe().keys),
  (schema) => schema.optional()
);

const createAddressSchema = Joi.object({
  address_type: Joi.string().valid('Home', 'Office', 'Other').required().messages({
    'any.required': 'Address type is required',
    'any.only': 'Address type must be Home, Office, or Other'
  }),
  full_name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters'
  }),
  mobile_number: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Mobile number must be a valid 10-digit Indian number',
      'any.required': 'Mobile number is required'
    }),
  address_line1: Joi.string().max(255).required(),
  address_line2: Joi.string().max(255).allow('', null),
  city: Joi.string().max(100).required(),
  state: Joi.string().max(100).required(),
  postal_code: Joi.string()
    .pattern(/^[1-9][0-9]{5}$/)
    .required()
    .messages({
      'string.pattern.base': 'Postal code must be a valid 6-digit pincode',
      'any.required': 'Postal code is required'
    }),
  country: Joi.string().default('India'),
  is_default: Joi.boolean().default(false),
});

const updateAddressSchema = createAddressSchema.fork(
  Object.keys(createAddressSchema.describe().keys),
  (schema) => schema.optional()
);



const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("Pending", "Paid", "Shipped", "Delivered", "Cancelled")
    .required()
    .messages({
      "any.only":
        "Status must be one of Pending, Paid, Shipped, Delivered, or Cancelled.",
      "any.required": "Order status is required.",
    }),
});

const checkoutSchema = Joi.object({
  shipping_address_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Shipping address ID must be a number.",
      "any.required": "Shipping address ID is required.",
    }),

  pincode_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Pincode ID must be a number.",
      "any.required": "Pincode ID is required.",
    }),

  // Since you're only using COD, this will always default
  payment_method: Joi.string()
    .valid("Cash on Delivery")
    .default("Cash on Delivery")
    .messages({
      "any.only": "Only 'Cash on Delivery' payment method is supported.",
    }),

  other_charge: Joi.string()
    .valid("Standard", "Express", "Free", "Custom")
    .default("Standard")
    .messages({
      "any.only": "Invalid delivery type. Choose Standard, Express, Free, or Custom.",
    }),

  tax: Joi.number().precision(2).optional().messages({
    "number.base": "Tax must be a valid number.",
  }),

  discount: Joi.number().precision(2).optional().messages({
    "number.base": "Discount must be a valid number.",
  }),

  total_price: Joi.number().precision(2).required().messages({
    "number.base": "Total price must be a valid number.",
    "any.required": "Total price is required.",
  }),
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
  createDiscountSchema,
  updateDiscountSchema,
  createCartSchema,
  updateCartSchema,
  createPincodeSchema,
  updatePincodeSchema,
  createAddressSchema,
  updateAddressSchema,
  checkoutSchema,
  updateOrderStatusSchema

};
