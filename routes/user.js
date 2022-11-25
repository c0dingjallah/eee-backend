const express = require('express')
const cors = require('cors');

// controller functions
const { loginUser, loginAdmin, signupUser, signupAdmin } = require('../controllers/userController')

const router = express.Router()

// login route
router.options('/login', cors())
router.post('/login', loginUser)

//admin login route
router.post('/adminlogin', loginAdmin)

// signup route
router.post('/signup', signupUser)

// signup route
router.post('/adminsignup', signupAdmin)

module.exports = router