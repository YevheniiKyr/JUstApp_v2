const Payment = require("../Models/payment");
const stripe = require("stripe")(process.env.STRIPE_KEY);

//ВИПРАВИТИ І ЗРОБИТИ РОБОЧИМ
class PaymentController {
    async create(req, res) {

        await stripe.charges.create(
            {
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: "usd",
            },
            (stripeErr, stripeRes) => {
                if (stripeErr) {
                    res.status(500).json(stripeErr);
                } else {
                    res.status(200).json(stripeRes);
                }
            }
        );
        }
}

module.exports = new PaymentController()