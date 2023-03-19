const User = require("../Models/User");
const bcrypt = require("bcrypt");
const {ObjectId} = require("bson");
const Product = require("../Models/product");

class UserController {


    async getAll (req,res) {
        try {
            let id = []
            id = req.query.id
            if(id) {
                console.log("FETCH USER BY ID ARRAY")
                id = id.map(id => new ObjectId(id))
                const users = await User.find({
                    '_id': {$in: id}
                })
                res.json(users);
                return
            }
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getByID (req,res) {
        console.log("WE GET USER BY ID")
        try {

            const user = await User.findById(req.params.id);
            //  const { password, ...others } = user._doc;
            res.json(user);
        } catch(e){
            res.status(500).json(e)
        }

    }

    async update(req,res) {
        if (req.body.password) {
            req.body.password = bcrypt.hash(req.body.password,3)
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }


    async delete (req,res) {
        try {
            const {id} = req.params
            if(!id){
                res.status(400).json({message: 'no id'});
            }
            const deletedUser = await User.findByIdAndDelete(id);
            if(deletedUser == null)
            {
                res.json({message :"Cant find user with this id"})
            }
            else res.json(deletedUser);
        } catch(e){
            res.status(500).json(e)
        }

    }


}


module.exports = new UserController()