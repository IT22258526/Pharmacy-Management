const express = require('express');
const { loginController, registerController } = require('../controllers/userController'); // Correct import

const router = express.Router();

// method-get
router.post('/login', loginController);
// method-POST
router.post('/register', registerController);

module.exports = router;
