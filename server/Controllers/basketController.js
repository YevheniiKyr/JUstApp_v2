const Basket = require("../Models/basket")
const User = require("../Models/user")

const {ObjectId} = require("bson");

class BasketController {


    async create(req, res) {
        try {
            const {user} = req.body
            const existingUser = await User.findById(user)
            if (!existingUser) {
                res.status(500).json("user non exist")
            }
            const existingBasket = await Basket.findById(user);
            if (!existingBasket) {
                res.status(500).json("Basket already exist")
            }

            const basket = await Basket.create({user: user})
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getByID(req, res) {
        try {
            const basket = await Basket.findById(req.params.id);

            console.log("GET BASKET BY ID" + basket)
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getByUser(req, res) {

        try {
            console.log("GET BASKET BY USER")
            console.log("USER" + req.query.user)
            let basket = await Basket.findOne({user: req.query.user});
            if (!basket) {
                console.log("YOU ARE STUPID")

            }
            console.log(basket)
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const basket = await Basket.find();
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async delete(req, res) {
        try {

            const basket = await Basket.findByIdAndDelete(req.params.id);
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async deleteProductFromBasket(req, res) {
        try {

            const basket = await Basket.findByIdAndDelete(req.params.id);
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async update(req, res) {

        const {product_id, amount} = req.body;

        try {
            // Find the basket with the specified ID
            const basket = await Basket.findById(req.params.id)

            if (!basket) {
                // If the product is not found, return an error response
                console.log("Basket not found'")
                res.status(404).json({error: 'Basket not found'});
                return;
            }


            console.log("PROD_ID " + product_id)
            if (product_id === 'all') {
                console.log("all here")
                basket.products = []
            } else {
                console.log("no here")

                // Check if the product is already in the cart
                const existingProduct = basket.products.find(p =>
                    JSON.stringify(p.product) === JSON.stringify(new ObjectId(product_id))
                )


                if (existingProduct) {
                    console.log("so already exist")
                    if (amount.toString() === 'all') {
                        console.log("ALL DELETE")
                        basket.products = basket.products.filter(prod => prod.product !== existingProduct.product)
                        const deletedFromBasket = await Basket.findByIdAndUpdate(req.params.id, basket, {new: true})
                        res.json({message: 'Product deleted from cart', deletedFromBasket});
                        return
                    }

                    existingProduct.amount += amount;

                } else {

                    basket.products.push({product: product_id, amount: amount});


                }
            }

            const basketUpdated = await Basket.findByIdAndUpdate(req.params.id, basket, {new: true})

            res.json({message: 'Product added to cart', basketUpdated});

        } catch (e) {
            res.status(500).json(e)

            // Return a success response with the updated cart contents

        }


    }

}

module.exports = new BasketController()