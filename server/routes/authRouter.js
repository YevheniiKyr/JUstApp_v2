const router = require('express').Router()
const authController = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware")

router.post('/signin',  authController.signin)
router.post('/signup',  authController.signup)
router.get('/check', authMiddleware, authController.verify )

module.exports = router