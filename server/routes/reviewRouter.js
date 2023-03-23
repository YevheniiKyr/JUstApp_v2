const router = require('express').Router()
const reviewController = require("../Controllers/reviewController");

// all reviews about prod by id  (we will use product id and user id inner)
router.get('/' ,  reviewController.getAllReviewsAboutProduct)
// get review by review id
router.get('/:id' ,  reviewController.getByID)
// create review
router.post('/', reviewController.create)

//update review by id, we need user_id and prod_id
router.put('/:id',  reviewController.update)
router.delete('/:id', reviewController.delete)
router.delete('/', reviewController.deleteAll)
module.exports = router