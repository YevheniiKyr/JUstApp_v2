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
            if(!basket){
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

        console.log("we are here")
        const {product_id, amount} = req.body;
        console.log("AMOUNT " + amount)

        try {
            // Find the basket with the specified ID
            const basket = await Basket.findById(req.params.id)

            console.log("WHAT IS IN " + basket)

            if (!basket) {
                // If the product is not found, return an error response
                console.log("Basket not found'")
                res.status(404).json({error: 'Basket not found'});
                return;
            }

            console.log("DATA HERE " + req.params.id + ' ' + product_id + ' ' +amount  )


            // Check if the product is already in the cart
            // не працює фільтр
            const existingProduct = basket.products.find(p =>
                    JSON.stringify(p.product) === JSON.stringify(new ObjectId(product_id))
            )




            console.log("EXISTING PROD" + existingProduct)

            if (existingProduct) {
                console.log("so already exist")
                if (amount.toString() === 'all'){
                    console.log("Cant be like that ")

                    console.log("ALL DELETE")
                    basket.products = basket.products.filter(prod => prod.product !== existingProduct.product)
                    const deletedFromBasket = await Basket.findByIdAndUpdate(req.params.id, basket, {new: true})
                    res.json({message: 'Product deleted from cart', deletedFromBasket});
                    return
                }
                // If the product is already in the cart, update the amount
                //чи спрацює це додавання?
               // arr = arr.filter(item => item !== value
                console.log("finally")
                existingProduct.amount += amount;
                console.log(basket)
                console.log("amount++")

            } else {
                console.log("so we are trying to push")
                // If the product is not in the cart, add it to the cart
                console.log("PROD ID SEVER " + product_id)
                basket.products.push({product: product_id, amount:amount});
                console.log("BASKET FIX "+ basket)
                console.log("pushed")

            }

            const basketUpdated = await Basket.findByIdAndUpdate(req.params.id, basket, {new:true})

            console.log(basketUpdated)
             res.json({message: 'Product added to cart', basketUpdated});

        } catch (e) {
            res.status(500).json(e)

            // Return a success response with the updated cart contents

        }


    }

}

module.exports = new BasketController()