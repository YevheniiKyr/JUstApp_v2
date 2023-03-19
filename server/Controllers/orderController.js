const Order = require("../Models/order.js");


class OrderController {

    async create (req,res) {
    console.log("WE ARE AT THE BACKENDDDDDDDDDDD")
        try {


        console.log(req.body.order)
            const order = await Order.create(req.body.order)
                console.log("CREATED "+ order)
            return res.json(order)

        } catch (e) {
            res.status(500).json(e)
        }

    }

    async getAll (req,res) {

        try {
            console.log("FETCH ALL ORDERS")
                const orders = await Order.find()
            console.log(orders)
                res.json(orders)

        }catch (e) {
            res.status(500).json(e)
        }


    }

    async getByID (req,res) {
        try {

            const order = await Order.findById(req.params.id);
            res.json(order);
        } catch(e){
            res.status(500).json(e)
        }

    }

    async update(req,res) {
        try {
            const order = req.body;
            if(!order._id){
                res.status(400).json({message: 'no id'});
            }
            const updatedOrder = await Order.findByIdAndUpdate(order._id,  order, {new:true} );
            return res.json(updatedOrder);
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
            const deletedOrder = await Product.findByIdAndDelete(id);

            if(deletedOrder == null)
            {
                res.json({message :"Cant find book with this id"})
            }
            else res.json(deletedOrder);
        } catch(e){
            res.status(500).json(e)
        }

    }


}


module.exports = new OrderController()