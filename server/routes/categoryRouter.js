const router = require('express').Router()
const categoryController = require("../Controllers/categoryController");
const checkRole = require("../Middlewares/checkRoleMiddleware")


router.get('/' ,  categoryController.getAll)
router.post('/' ,  categoryController.create)
router.get('/:id', categoryController.getByID)
router.put('/:id', categoryController.update)
router.delete('/:id',  categoryController.delete)

module.exports = router