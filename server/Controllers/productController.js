const Product = require("../Models/Product");
const Category = require("../Models/Category");
const Review = require("../Models/review");
const Basket = require("../Models/basket");

const uuid = require('uuid')
const path = require("path");
const {ObjectId} = require("bson");

class ProductController {

    async create(req, res) {

        try {

            const {title, price, category, description, size, color} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'

            const category_check = Category.findById(category)
            if (!category_check) res.status(500).json("category doesnt exist")

            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const prod = await Product.create({title, price, img: fileName, category, description, size, color})

            return res.json(prod)
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async getAll(req, res) {

        const priceRange = req.query.priceRange
        const filterCategory = req.query.category
        const searchQuery = req.query.search
        let {limit, page} = req.query
        const alphabetOrder = req.query.alphabetOrder
        const basket_id = req.query.basket_id
        page = page || 1
        limit = limit || 15
        const offset = page * limit - limit

        let id = req.query.id

        let count = await Product.count();

        try {
            // Create an empty filter object to store the filter conditions
            const filter = {};

            // Apply filters based on the presence of query parameters
            if (id) {
                id = id.map((id) => new ObjectId(id));
                filter._id = {$in: id};
            }

            if(basket_id) {
                const basket = await Basket.findById(basket_id)
                console.log("AAGGHAHAHAHAH " + basket)
                if (basket) {
                    if (basket.products.length) {

                        const product_ids = basket.products.map((prod) => prod.product)
                        const products = await Product.find({
                            '_id': {$in: product_ids}
                        })
                        const productsWithAmounts = products.map((product) => {
                            const productWithAmount = basket.products.find((prod) => prod.product.equals(product._id));
                            return {product, amount: productWithAmount.amount};
                        });


                        res.json(productsWithAmounts);
                        return
                    }
                    res.json({})
                    return
                }

            }

            if (filterCategory) {
                filter.category = filterCategory;
            }

            if (searchQuery) {
                const regex = new RegExp(searchQuery, 'i');
                filter.title = regex;
            }

            if (priceRange) {
                // Apply price range filter logic based on your requirements
                // For example:
                const minPrice = priceRange.min
                const maxPrice = priceRange.max
                filter.price = {$gte: minPrice, $lte: maxPrice};
            }


            // Get the count of filtered products
            const filteredCount = await Product.find(filter).countDocuments();

            // Get the filtered products with pagination
            let products = await Product.find(filter)
                .skip(offset)
                .limit(limit);

            for (const product of products) {
                const reviews = await Review.find({product: product._id});
                const totalRating = reviews.reduce(
                    (sum, review) => sum + review.rating,
                    0
                );
                product.averageRating =
                    reviews.length > 0 ? totalRating / reviews.length : 0;
            }

            if (alphabetOrder === 'ASCENT') {
                products = products.sort((a, b) => a.title.localeCompare(b.title));
            } else if (alphabetOrder === 'DESCENT') {
                products = products.sort((a, b) => b.title.localeCompare(a.title));
            }


            // Send the response with products and count
            res.json({products, count: filteredCount});
        } catch (e) {
            console.log(e);
            res.status(500).json(e);

            // try {
            //     if (id) {
            //         id = id.map(id => new ObjectId(id))
            //         const products = await Product.find({
            //             '_id': {$in: id}
            //         })
            //         for (const product of products) {
            //             const reviews = await Review.find({product: product._id})
            //             const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            //             product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            //         }
            //         res.json(products)
            //         return
            //     }
            //
            //
            //
            //     if (filterCategory && searchQuery) {
            //
            //         const regex = new RegExp(searchQuery, 'i');
            //
            //         const count = await Product.find({
            //             category: filterCategory
            //         }).countDocuments()
            //
            //         const products = await Product.find({
            //             category: filterCategory,
            //              title: regex
            //
            //          }).skip(offset).limit(limit)
            //
            //         for (const product of products) {
            //             const reviews = await Review.find({product: product._id})
            //             const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            //             product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            //         }
            //         return res.json({products, count})
            //
            //     }
            //
            //
            //     if(searchQuery){
            //
            //         const regex = new RegExp(searchQuery, 'i');
            //
            //         const count = await Product.find({
            //             category: filterCategory
            //         }).countDocuments()
            //
            //         const products = await Product.find({
            //             title: regex
            //         }).skip(offset).limit(limit)
            //
            //         for (const product of products) {
            //             const reviews = await Review.find({product: product._id})
            //             const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            //             product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            //         }
            //         res.json({products, count})
            //         return
            //
            //     }
            //     if(filterCategory){
            //
            //         const count = await Product.find({
            //             category: filterCategory
            //         }).countDocuments()
            //
            //         const products = await Product.find({
            //             category: filterCategory
            //         }).skip(offset).limit(limit)
            //         for (const product of products) {
            //             const reviews = await Review.find({product: product._id})
            //             const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            //             product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            //         }
            //         res.json({products, count})
            //         return
            //     }
            //
            //     if(page && limit) {
            //         const products = await Product.find().skip(offset).limit(limit);
            //         for (const product of products) {
            //             const reviews = await Review.find({product: product._id})
            //             const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            //             product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            //         }
            //         res.json({products, count})
            //     }
            //
            //     else{
            //
            //
            //         const products = await Product.find();
            //         for (const product of products) {
            //             const reviews = await Review.find({product: product._id})
            //             const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            //             product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            //             console.log(product.averageRating)
            //
            //         }
            //      //   console.log("REVIEWS " + products.reviews)
            //
            //         res.json({products, count})
            //     }
            // }
            // catch (e) {
            //     console.log(e)
            //     res.status(500).json(e)
            // }

        }
    }


    async getByID(req, res) {
        try {

            //  console.log("here we go " + req.params.id)
            const product = await Product.findById(req.params.id)
            // .populate('review')
            // product.calculateAverageRating()
            //     .then(averageRating => {
            //         product.averageRating = averageRating;
            //         console.log("AVERAGE: " + product.averageRating);
            //     })
            //     .catch(error => console.error(error));
            //const product = await Product.findById(productId).populate('reviews');

            // const reviews = await Review.find({product: product._id})
            // const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            // product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            const reviews = await Review.find({product: product._id})
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

            res.json(product);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async setRating(product) {
        const reviews = await Review.find({product: product._id})
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        product.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    }

    async update(req, res) {
        try {
            const product = req.body;
            if (!product._id) {
                res.status(400).json({message: 'no id'});
            }
            const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new: true});

            return res.json(updatedProduct);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async delete(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'no id'});
            }
            const deletedProduct = await Product.findByIdAndDelete(id);

            if (deletedProduct == null) {
                res.json({message: "Cant find book with this id"})
            } else res.json(deletedProduct);
        } catch (e) {
            res.status(500).json(e)
        }

    }


}


module.exports = new ProductController()