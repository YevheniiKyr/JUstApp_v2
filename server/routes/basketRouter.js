const router = require('express').Router()
const basketController = require("../Controllers/basketController");


router.get('/:id', basketController.getByID)
router.put('/:id', basketController.update)
router.get('/', basketController.getByUser)
router.post('/', basketController.create)
router.delete('/:id',  basketController.delete)
module.exports = router