const {loginUser,registerUser,googleAuth,loginWithGoogle,profile } = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const Validator =  require('express-joi-validation').createValidator({passError: true })
const {registerSchema,loginSchema} = require('../utils/validation')
const {authenticateToken} = require('../middleware/authMiddleware')

router.post('/register', Validator.body(registerSchema),registerUser);
router.post('/login', Validator.body(loginSchema),loginUser);
router.get('/google',loginWithGoogle)
router.get('/google/callback',googleAuth);  
router.get('/profile',authenticateToken, profile)

module.exports = router;