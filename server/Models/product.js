const mongoose = require('mongoose')

const Product = new mongoose.Schema({

    title: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    review: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    img: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    description: {type: String, required: true},
    size: {type: String, default: 'def_size'},
    color: {type: String, default: 'def_color'},


}, {
    timestamps: true,
    toJSON: {virtuals: true}
})

// Product.methods.calculateAverageRating = async function () {
//     const product = this;
//    // await product.populate('review').
//     console.log("this.review.length " + this.review.length)
//         const totalRating = this.review.reduce((sum, review) => sum + review.rating, 0);
//         return this.review.length > 0 ? totalRating / this.review.length : 0;
//
//
// };

Product.virtual('averageRating')
module.exports = mongoose.models.Product || mongoose.model('Product', Product)