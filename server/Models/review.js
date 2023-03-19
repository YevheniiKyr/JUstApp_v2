const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const Review = new mongoose.Schema ({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    text: {
        type:String,
        default: '',
        required: true
    }
}, {timestamps: true})
module.exports = mongoose.model('Review', Review)