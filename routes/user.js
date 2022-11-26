const express = require('express')

// controller functions
const { loginUser, loginAdmin, signupUser, signupAdmin } = require('../controllers/userController')

const router = express.Router()

// login route

router.post('/login', loginUser)

//admin login route
router.post('/adminlogin', loginAdmin)

// signup route
router.post('/signup', signupUser)

// signup route
router.post('/adminsignup', signupAdmin)

module.exports = router