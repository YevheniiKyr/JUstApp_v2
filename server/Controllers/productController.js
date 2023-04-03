const Product = require("../Models/Product");
const Category = require("../Models/Category");
const uuid = require('uuid')
const path = require("path");
const {ObjectId} = require("bson");

class ProductController {

    async create (req,res) {

        try {

            const {title, price, category, description, size, color} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'

            const category_check = Category.findById(category)
            if (!category_check) res.status(500).json("category doesnt exist")

            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const prod = await Product.create({title, price, img:fileName, category, description, size, color })

            return res.json(prod)
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async getAll (req,res) {

        const filterCategory = req.query.category
        const searchQuery = req.query.search
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 15
        const offset = page * limit - limit

        let id = req.query.id

        let count = await Product.count();


        try {
            if (id) {
                id = id.map(id => new ObjectId(id))
                const products = await Product.find({
                    '_id': {$in: id}
                })
                res.json(products)
                return
            }



            if (filterCategory && searchQuery) {

                const regex = new RegExp(searchQuery, 'i');

                const count = await Product.find({
                    category: filterCategory
                }).countDocuments()

                const products = await Product.find({
                    category: filterCategory,
                     title: regex

                 }).skip(offset).limit(limit)

                return res.json({products, count})

            }


            if(searchQuery){

                const regex = new RegExp(searchQuery, 'i');

                const count = await Product.find({
                    category: filterCategory
                }).countDocuments()

                const products = await Product.find({
                    title: regex
                }).skip(offset).limit(limit)

                res.json({products, count})
                return

            }
            if(filterCategory){

                const count = await Product.find({
                    category: filterCategory
                }).countDocuments()

                const products = await Product.find({
                    category: filterCategory
                }).skip(offset).limit(limit)

                res.json({products, count})
                return
            }

            if(page && limit) {
                const products = await Product.find().skip(offset).limit(limit);
                res.json({products, count})
            }
            else{


                const products = await Product.find();
                res.json({products, count})
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }


    }


    async getByID (req,res) {
        try {

          //  console.log("here we go " + req.params.id)
            const product = await Product.findById(req.params.id);
            res.json(product);
        } catch(e){
            res.status(500).json(e)
        }

    }

    async update(req,res) {
        try {
            const product = req.body;
            if(!product._id){
                res.status(400).json({message: 'no id'});
            }
            const updatedProduct = await Product.findByIdAndUpdate(product._id,  product, {new:true} );
            return res.json(updatedProduct);
        } catch(e){
            res.status(500).json(e)
        }

    }
    async delete (req,res) {
        try {
            const {id} = req.params
            if(!id){
                res.status(400).json({message: 'no id'});
            }
            const deletedProduct = await Product.findByIdAndDelete(id);

            if(deletedProduct == null)
            {
                res.json({message :"Cant find book with this id"})
            }
            else res.json(deletedProduct);
        } catch(e){
            res.status(500).json(e)
        }

    }


}


module.exports = new ProductController()