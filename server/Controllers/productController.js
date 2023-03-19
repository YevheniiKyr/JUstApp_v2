const Product = require("../Models/Product");
const Category = require("../Models/Category");
const uuid = require('uuid')
const path = require("path");
const {ObjectId} = require("bson");
//const path = require('path')
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
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 15
        console.log(limit)
        const offset = page * limit - limit

        let id = []
        id = req.query.id
     //   console.log("ID ARRAY " + id)

        console.log("GET ALL")
        try {
            console.log("TRY")
            if (id) {
                console.log("ID IS PRESENT")
                id = id.map(id => new ObjectId(id))
                console.log("SO ITS ID ")
                const products = await Product.find({
                    '_id': {$in: id}
                })
                console.log("WTF")

                console.log(products)
                res.json(products)
                return
            }
            console.log("BEFORE COUNT")
            const count = await Product.count();
            console.log("COUNT")
            if (filterCategory) {
                console.log("FILTER" + filterCategory)

                const products = await Product.find({
                    category: filterCategory
                }).skip(offset).limit(limit)

                /*  const products = await Product.find({
                      category: filterCategory
                  })*/
                res.json({products, count})
            } else {

                console.log("no filter")

                const products = await Product.find();
                res.json({products, count})
            }
        }
        catch (e) {
            console.log("error")
            res.status(500).json(e)
        }


    }


    async getByID (req,res) {
        try {

            console.log("here we go " + req.params.id)
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