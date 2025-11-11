

const errorHandler = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    const details = err.error.details.map((d) => d.message.replace(/["']/g, ''));
    return res.status(400).json({
      success: false,
      errors: details,
    });
  }

  // Log non-Joi errors for debugging
  console.error('Unhandled Error:', err);

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};


module.exports = {errorHandler}