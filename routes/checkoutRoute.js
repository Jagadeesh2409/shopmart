const express = require("express");
const router = express.Router();
const { checkout } = require("../controllers/checkoutController");

const validator = require("express-joi-validation").createValidator({});
const { checkoutSchema } = require("../utils/validation");

router.post("/checkout",  validator.body(checkoutSchema), checkout);


module.exports = router;
