const router = require('express').Router()
const paymentController = require("../Controllers/paymentController");

router.post('/' ,  paymentController.create)


module.exports = router