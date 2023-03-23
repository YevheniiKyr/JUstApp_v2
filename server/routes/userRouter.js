const router = require('express').Router()
const userController = require("../Controllers/userController");

router.get('/' ,  userController.getAll)
router.get('/:id', userController.getByID)
router.put('/:id',  userController.update)
router.delete('/:id', userController.delete)
router.delete('/', userController.deleteAll)
module.exports = router